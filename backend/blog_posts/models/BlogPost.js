const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  htmlContent: {
    type: String,
    default: "N/A",
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
  active:{
    type: String,
    default: "y",
    lowercase: true,
    trim: true,
  },
  cover: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attachment',
    required: false,
  }
}, {
  timestamps: true, // opcional: cria createdAt e updatedAt
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
