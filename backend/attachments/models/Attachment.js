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

module.exports = mongoose.model('Attachment', attachmentSchema);
