const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Equipment = require('../models/Equipment');

router.get('/', auth, async (req, res) => {
  try {
    const equipments = await Equipment.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(equipments);
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

    const { movid, camera, tripod, light } = req.body;

    try {
      const newEquipment = new Equipment({
        movid,
        camera,
        tripod,
        light,
        user: req.user.id,
      });

      const equipment = await newEquipment.save();
      res.json(equipment);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put('/:id', auth, async (req, res) => {
  const { movid, camera, tripod, light } = req.body;

  const equipmentField = {};
  if (movid) equipmentField.movid = movid;
  if (camera) equipmentField.camera = camera;
  if (tripod) equipmentField.tripod = tripod;
  if (light) equipmentField.light = light;

  try {
    let equipment = await Equipment.findById(req.params.id);

    if (!equipment) return res.status(404).json({ msg: 'Equipment not found' });

    if (equipment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      { $set: equipmentField },
      { new: true }
    );

    res.json(equipment);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    let equipment = await Equipment.findById(req.params.id);

    if (!equipment) return res.status(404).json({ msg: 'Equipment not found' });

    if (equipment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Equipment.findOneAndRemove(req.params.id);

    res.json({ msg: 'Equipment Removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
