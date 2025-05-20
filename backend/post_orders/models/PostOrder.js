// models/PostOrder.js
const mongoose = require('mongoose');

const postOrderSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  orderedPostIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
  }],
}, { timestamps: true });

module.exports = mongoose.model('PostOrder', postOrderSchema);