const mongoose = require('mongoose');

const IncomeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  num: {
    type: String,
    required: true,
  },

  total: {
    type: String,
    required: true,
  },
  spend: {
    type: String,
    required: true,
  },
  profit: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('income', IncomeSchema);
