const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Income = require('../models/Income');

router.get('/', auth, async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(incomes);
  } catch (err) {
    console.error(err.message);
    await res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [auth, [check('num', 'num is not reqired').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { num, total, spend, profit } = req.body;

    try {
      const newIncome = new Income({
        num,
        total,
        spend,
        profit,
        user: req.user.id,
      });

      const income = await newIncome.save();
      res.json(income);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put('/:id', auth, async (req, res) => {
  const { num, total, spend, profit } = req.body;

  const incomeField = {};
  if (num) incomeField.num = num;
  if (total) incomeField.total = total;
  if (spend) incomeField.spend = spend;
  if (profit) incomeField.profit = profit;

  try {
    let income = await Income.findById(req.params.id);

    if (!income) return res.status(404).json({ msg: 'Income not found' });

    if (income.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    income = await Income.findByIdAndUpdate(
      req.params.id,
      { $set: incomeField },
      { new: true }
    );

    res.json(income);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    let income = await Income.findById(req.params.id);

    if (!income) return res.status(404).json({ msg: 'Income not found' });

    if (income.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Income.findOneAndRemove(req.params.id);

    res.json({ msg: 'Income Removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
