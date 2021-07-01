const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Form = require('../models/Form');

router.get('/allforms', auth, async (req, res) => {
  try {
    const forms = await Form.find().sort({
      date: -1,
    });
    res.json(forms);
  } catch (err) {
    console.error(err.message);
    await res.status(500).send('Server Error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const forms = await Form.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(forms);
  } catch (err) {
    console.error(err.message);
    await res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [auth, [check('movid', 'movid is not reqired').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      movid,
      time,
      clas,
      quality,
      camtype,
      move,
      stat,
      price,
      more,
    } = req.body;

    try {
      const newForm = new Form({
        movid,
        time,
        clas,
        quality,
        camtype,
        move,

        stat,
        price,
        more,
        user: req.user.id,
      });

      const form = await newForm.save();
      res.json(form);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put('/:id', auth, async (req, res) => {
  const {
    movid,
    time,
    clas,
    quality,
    camtype,
    move,
    stat,
    price,
    more,
  } = req.body;

  const formField = {};
  if (movid) formField.movid = movid;
  if (time) formField.time = time;
  if (clas) formField.clas = clas;
  if (quality) formField.quality = quality;
  if (camtype) formField.camtype = camtype;
  if (move) formField.move = move;
  if (stat) formField.stat = stat;
  if (price) formField.price = price;
  if (more) formField.more = more;

  try {
    let form = await Form.findById(req.params.id);

    if (!form) return res.status(404).json({ msg: 'Form not found' });

    if (form.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    form = await Form.findByIdAndUpdate(
      req.params.id,
      { $set: formField },
      { new: true }
    );

    res.json(form);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/allforms/:id', auth, async (req, res) => {
  const {
    movid,
    time,
    clas,
    quality,
    camtype,
    move,
    stat,
    price,
    more,
  } = req.body;

  const formField = {};
  if (movid) formField.movid = movid;
  if (time) formField.time = time;
  if (clas) formField.clas = clas;
  if (quality) formField.quality = quality;
  if (camtype) formField.camtype = camtype;
  if (move) formField.move = move;

  if (stat) formField.stat = stat;
  if (price) formField.price = price;
  if (more) formField.more = more;

  try {
    let form = await Form.findById(req.params.id);

    if (!form) return res.status(404).json({ msg: 'Form not found' });

    form = await Form.findByIdAndUpdate(
      req.params.id,
      { $set: formField },
      { new: true }
    );

    res.json(form);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    let form = await Form.findById(req.params.id);

    if (!form) return res.status(404).json({ msg: 'Form not found' });

    if (form.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Form.findOneAndRemove(req.params.id);

    res.json({ msg: 'Form Removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/allforms/:id', auth, async (req, res) => {
  try {
    let form = await Form.findById(req.params.id);

    if (!form) return res.status(404).json({ msg: 'Form not found' });

    await Form.findOneAndRemove(req.params.id);

    res.json({ msg: 'Form Removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
