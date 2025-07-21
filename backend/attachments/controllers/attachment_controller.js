const Attachment = require('../models/Attachment');

exports.uploadAttachment = async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;

    const attachment = new Attachment({
      filename: originalname,
      mimetype,
      data: buffer,
    });

    await attachment.save();

    res.status(201).json({ id: attachment._id });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar anexo' });
  }
};

exports.getAttachmentsPaginated = async (req, res) => {
  try {
    const pageIndex = parseInt(req.params.index);
    const DEFAULT_PAGE_SIZE = 10;
    const MAX_SAFE_PAGE_SIZE = 5;

    // Reduz dinamicamente se estiver na primeira página (anexos mais pesados)
    const pageSize = pageIndex === 0 ? MAX_SAFE_PAGE_SIZE : DEFAULT_PAGE_SIZE;
    const skip = pageIndex * pageSize;

    const total = await Attachment.countDocuments({ data: { $exists: true, $ne: null } });

    const attachments = await Attachment.collection.aggregate([
      { $match: { data: { $exists: true, $ne: null } } },
      { $sort: { uploadedAt: -1 } },
      { $skip: skip },
      { $limit: pageSize },
      {
        $project: {
          _id: 1,
          filename: 1,
          mimetype: 1,
          uploadedAt: 1,
          data: 1
        }
      }
    ], { allowDiskUse: true }).toArray();

    const response = attachments.map(a => ({
      _id: a._id,
      filename: a.filename,
      mimetype: a.mimetype,
      uploadedAt: a.uploadedAt,
      base64: a.data?.buffer
        ? `data:${a.mimetype};base64,${a.data.buffer.toString('base64')}`
        : null
    }));

    res.json({
      page: pageIndex,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      results: response
    });
  } catch (err) {
    console.error('Erro ao buscar anexos paginados:', err);
    res.status(500).json({
      message: 'Erro ao buscar anexos paginados',
      error: err.message
    });
  }
};

exports.getAttachmentByFilename = async (req, res) => {
  try {
    const filename = req.params.name;

    const attachment = await Attachment.findOne({ filename });
    if (!attachment) return res.status(404).send('Arquivo não encontrado');

    res.set('Content-Type', attachment.mimetype);
    res.send(attachment.data);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar por filename' });
  }
};

exports.getAttachmentsByFilename = async (req, res) => {
  try {
    const filename = req.params.name;

    // Expressão regular para buscar "tipo LIKE", case-insensitive
    const regex = new RegExp(filename, 'i');

    const attachments = await Attachment.find({ filename: regex }).sort({ uploadedAt: -1 });

    if (attachments.length === 0) {
      return res.status(404).json({ message: 'Nenhum anexo encontrado com esse nome' });
    }

    const response = attachments.map(a => ({
      _id: a._id,
      filename: a.filename,
      mimetype: a.mimetype,
      uploadedAt: a.uploadedAt,
      base64: `data:${a.mimetype};base64,${a.data.toString('base64')}`
    }));

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar anexos por nome' });
  }
};

exports.getAttachment = async (req, res) => {
  try {
    const attachment = await Attachment.findById(req.params.id);
    if (!attachment) return res.status(404).send('Arquivo não encontrado');

    res.set('Content-Type', attachment.mimetype);
    res.send(attachment.data);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar anexo' });
  }
};

exports.deleteAttachment = async (req, res) => {
  try {
    const deleted = await Attachment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Anexo não encontrado' });

    res.status(200).json({ message: 'Anexo deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar anexo' });
  }
};

