const mongoose = require('mongoose');

const ProcessSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },

  movid: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'not started',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('process', ProcessSchema);
