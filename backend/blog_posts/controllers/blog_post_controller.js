const BlogPost = require('../models/BlogPost');

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

    await newPost.save();
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

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

