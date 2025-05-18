const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  htmlContent: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true,
  }],
}, {
  timestamps: true, // opcional: cria createdAt e updatedAt
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
