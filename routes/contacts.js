const express = require('express');
const router  = express.Router();

router.get('/' , (req , res) => {
  res.send('Get all contacts');
});

router.post('/' , (req , res) => {
  res.send('Add contact');
});

router.put('/:id' , (req , res) => {
  res.send('Update contact');
});

router.delete('/:id' , (req , res) => {
  res.send('delete contact');
});

module.exports = router ;