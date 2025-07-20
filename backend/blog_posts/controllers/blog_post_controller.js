const BlogPost = require('../models/BlogPost');
const PostOrder = require('../../post_orders/models/PostOrder');

// Criar novo post
exports.createPost = async (req, res) => {
  try {
    const { title, htmlContent, tags, cover, author } = req.body;

    const newPost = new BlogPost({
      title,
      htmlContent,
      author: author || 'Equipe Fuerza',
      tags: tags || [],
      cover: cover || null
    });

    const savedPost = await newPost.save();

    // 🔁 Para cada tag, adiciona ao final da ordem
    if (Array.isArray(tags)) {
      for (const tag of tags) {
        const tagLower = tag.toLowerCase();
        const existing = await PostOrder.findOne({ tag: tagLower });

        if (existing) {
          if (!existing.orderedPostIds.includes(savedPost._id)) {
            existing.orderedPostIds.push(savedPost._id);
            await existing.save();
          }
        } else {
          await PostOrder.create({
            tag: tagLower,
            orderedPostIds: [savedPost._id]
          });
        }
      }
    }

    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Listar todos os posts
exports.getAllPosts = async (req, res) => {
  const posts = await BlogPost.find().sort({ createdAt: -1 });
  res.json(posts);
};

// Buscar post específico e contar view
exports.getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('cover'); // ← aqui

    if (!post) return res.status(404).json({ message: 'Post não encontrado' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPostsByTag = async (req, res) => {
  try {
    const tag = req.params.tag.toLowerCase();
    const posts = await BlogPost.find({ tags: tag });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar posts por tag' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post não encontrado' });
    res.status(200).json({ message: 'Post deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Atualizar um post existente
exports.updatePost = async (req, res) => {
  try {
    const { title, htmlContent, tags, cover, author, active } = req.body;

    // Buscar o post original antes da atualização
    const previousPost = await BlogPost.findById(req.params.id);
    if (!previousPost) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    // Atualizar o post
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title }),
        ...(htmlContent && { htmlContent }),
        ...(tags && { tags }),
        ...(cover !== undefined && { cover }),
        ...(author && { author }),
        ...(active !== undefined && active !== null && { active: String(active).trim().toLowerCase() }),
        updatedAt: new Date(),
      },
      { new: true }
    );

    // Verifica quais tags foram removidas
    const removedTags = (previousPost.tags || []).filter(
      tag => !(updatedPost.tags || []).includes(tag)
    );

    // Remove o ID do post da ordem de cada tag removida
    for (const tag of removedTags) {
      await PostOrder.findOneAndUpdate(
        { tag: tag.toLowerCase() },
        { $pull: { orderedPostIds: updatedPost._id } }
      );
    }

    // Verifica quais tags foram adicionadas
    const addedTags = (updatedPost.tags || []).filter(
      tag => !(previousPost.tags || []).includes(tag)
    );

    // Adiciona o ID do post na ordem de cada tag adicionada
    for (const tag of addedTags) {
      const tagLower = tag.toLowerCase();
      const existing = await PostOrder.findOne({ tag: tagLower });
      if (existing) {
        if (!existing.orderedPostIds.includes(updatedPost._id)) {
          existing.orderedPostIds.push(updatedPost._id);
          await existing.save();
        }
      } else {
        await PostOrder.create({
          tag: tagLower,
          orderedPostIds: [updatedPost._id]
        });
      }
    }

    // Retorna o post atualizado
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

