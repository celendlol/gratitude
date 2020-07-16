const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gratitudeSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
}, {
  timestamps: true,
});

const Gratitude = mongoose.model('Gratitude', gratitudeSchema);

module.exports = Gratitude;