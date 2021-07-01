const mongoose = require('mongoose');

const FormSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },

  movid: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    default: '1-5 min',
  },

  clas: {
    type: String,
    default: 'A',
  },
  quality: {
    type: String,
    default: 'HD',
  },
  camtype: {
    type: String,
    default: 'DSLR',
  },
  move: {
    type: String,
    default: 'Mobile',
  },

  stat: {
    type: String,
    default: 'Not Started',
  },
  price: {
    type: String,
    default: 'Waiting',
  },
  more: {
    type: String,
    default: 'Nothing',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('form', FormSchema);
