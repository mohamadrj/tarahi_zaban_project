const mongoose = require('mongoose');

const EquipmentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },

  movid: {
    type: String,
    required: true,
  },
  camera: {
    type: String,
    required: true,
  },
  tripod: {
    type: String,
    required: true,
  },
  light: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('equipment', EquipmentSchema);
