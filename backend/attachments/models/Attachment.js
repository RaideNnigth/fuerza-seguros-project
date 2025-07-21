const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
  filename: String,
  mimetype: String,
  data: Buffer, // conteúdo binário
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

// Índice para otimizar ordenação por data (paginada)
attachmentSchema.index({ uploadedAt: -1 });

module.exports = mongoose.model('Attachment', attachmentSchema);
