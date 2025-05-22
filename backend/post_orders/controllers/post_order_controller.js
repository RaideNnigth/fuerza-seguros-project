const PostOrder = require('../models/PostOrder');


// GET: Pega a ordem de posts de uma tag
exports.getPostOrderForTag = async (req, res) => {
  try {
    const tag = req.params.tag;

    if (!tag) {
      return res.status(400).json({ message: 'Tag não fornecida.' });
    }

    const result = await PostOrder.findOne({ tag: tag.toLowerCase() });
    res.status(200).json(result || { orderedPostIds: [] }); // retorna objeto vazio se não existir
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT: criar ou atualizar ordem de uma tag
exports.updatePostOrder = async (req, res) => {
  try {
    const tag = req.params.tag.toLowerCase();
    const { orderedPostIds } = req.body;

    if (!Array.isArray(orderedPostIds)) {
      return res.status(400).json({ message: 'Lista inválida.' });
    }

    const result = await PostOrder.findOneAndUpdate(
      { tag },
      { orderedPostIds },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};