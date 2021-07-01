const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Inventory = require('../models/Inventory');

router.get('/', auth, async (req, res) => {
  try {
    const inventorys = await Inventory.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(inventorys);
  } catch (err) {
    console.error(err.message);
    await res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [auth, [check('equipment', 'equipment is not reqired').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { equipment, model, price, invento } = req.body;

    try {
      const newInventory = new Inventory({
        equipment,
        model,
        price,
        invento,
        user: req.user.id,
      });

      const inventory = await newInventory.save();
      res.json(inventory);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put('/:id', auth, async (req, res) => {
  const { equipment, model, price, invento } = req.body;

  const inventoryField = {};
  if (equipment) inventoryField.equipment = equipment;
  if (model) inventoryField.model = model;
  if (price) inventoryField.price = price;
  if (invento) inventoryField.invento = invento;

  try {
    let inventory = await Inventory.findById(req.params.id);

    if (!inventory) return res.status(404).json({ msg: 'Inventory not found' });

    if (inventory.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    inventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      { $set: inventoryField },
      { new: true }
    );

    res.json(inventory);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    let inventory = await Inventory.findById(req.params.id);

    if (!inventory) return res.status(404).json({ msg: 'Inventory not found' });

    if (inventory.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Inventory.findOneAndRemove(req.params.id);

    res.json({ msg: 'Inventory Removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
