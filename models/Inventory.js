const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },

  equipment: {
    type: String,
    default: 'camera',
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  invento: {
    type: String,
    default: 'available',
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('inventory', InventorySchema);
