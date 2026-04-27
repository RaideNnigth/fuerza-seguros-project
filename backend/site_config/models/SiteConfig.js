const mongoose = require('mongoose');

const whatsappConfigSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: true,
  },
  phone: {
    type: String,
    default: '',
    trim: true,
  },
  message: {
    type: String,
    default: 'Olá! Gostaria de falar com a Fuerza Seguros.',
    trim: true,
  },
}, { _id: false });

const siteConfigSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'main',
  },
  whatsapp: {
    type: whatsappConfigSchema,
    default: () => ({}),
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('SiteConfig', siteConfigSchema);
