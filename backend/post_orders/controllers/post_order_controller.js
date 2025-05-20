const PostOrder = require('../models/PostOrder');

// POST: criar ou substituir ordem de uma tag
exports.setPostOrder = async (req, res) => {
  try {
    const { tag, orderedPostIds } = req.body;

    if (!tag || !Array.isArray(orderedPostIds)) {
      return res.status(400).json({ message: 'Dados inválidos.' });
    }

    const result = await PostOrder.findOneAndUpdate(
      { tag: tag.toLowerCase() },
      { orderedPostIds },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT: atualizar apenas ordem de uma tag existente
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
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: 'Tag não encontrada.' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};