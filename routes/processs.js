const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Process = require('../models/Process');

router.get('/', auth, async (req, res) => {
  try {
    const processs = await Process.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(processs);
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

    const { movid, status } = req.body;

    try {
      const newProcess = new Process({
        movid,
        status,
        user: req.user.id,
      });

      const process = await newProcess.save();
      res.json(process);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put('/:id', auth, async (req, res) => {
  const { movid, status } = req.body;

  const processField = {};
  if (movid) processField.movid = movid;
  if (status) processField.status = status;

  try {
    let process = await Process.findById(req.params.id);

    if (!process) return res.status(404).json({ msg: 'Process not found' });

    if (process.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    process = await Process.findByIdAndUpdate(
      req.params.id,
      { $set: processField },
      { new: true }
    );

    res.json(process);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    let process = await Process.findById(req.params.id);

    if (!process) return res.status(404).json({ msg: 'Process not found' });

    if (process.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Process.findOneAndRemove(req.params.id);

    res.json({ msg: 'Process Removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
