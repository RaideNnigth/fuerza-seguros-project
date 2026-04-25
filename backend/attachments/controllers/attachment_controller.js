const Attachment = require('../models/Attachment');
const sharp = require('sharp');

const DEFAULT_IMAGE_WIDTH = 900;
const DEFAULT_IMAGE_QUALITY = 72;
const MAX_IMAGE_WIDTH = 1600;

function clampNumber(value, fallback, min, max) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

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
    const DEFAULT_PAGE_SIZE = 5;
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
          uploadedAt: 1
        }
      }
    ], { allowDiskUse: true }).toArray();

    const response = attachments.map(a => ({
      _id: a._id,
      filename: a.filename,
      mimetype: a.mimetype,
      uploadedAt: a.uploadedAt
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
      uploadedAt: a.uploadedAt
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

exports.getOptimizedImage = async (req, res) => {
  try {
    const attachment = await Attachment.findById(req.params.id);
    if (!attachment) return res.status(404).send('Arquivo nÃ£o encontrado');

    if (!attachment.mimetype?.startsWith('image/')) {
      res.set('Content-Type', attachment.mimetype);
      return res.send(attachment.data);
    }

    const width = clampNumber(req.query.w, DEFAULT_IMAGE_WIDTH, 80, MAX_IMAGE_WIDTH);
    const quality = clampNumber(req.query.q, DEFAULT_IMAGE_QUALITY, 40, 90);

    try {
      const optimized = await sharp(attachment.data)
        .rotate()
        .resize({
          width,
          withoutEnlargement: true,
        })
        .webp({ quality })
        .toBuffer();

      res.set({
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      });
      return res.send(optimized);
    } catch (optimizationErr) {
      console.error('Falha ao otimizar imagem, enviando original:', optimizationErr);
      res.set({
        'Content-Type': attachment.mimetype,
        'Cache-Control': 'public, max-age=86400',
      });
      return res.send(attachment.data);
    }
  } catch (err) {
    console.error('Erro ao otimizar imagem:', err);
    res.status(500).json({ message: 'Erro ao otimizar imagem' });
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

