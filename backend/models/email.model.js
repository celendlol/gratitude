const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emailSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true }
}, {
  timestamps: true,
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;