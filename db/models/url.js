const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  long: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  short: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  }
})

module.exports = mongoose.model('Url', UrlSchema);