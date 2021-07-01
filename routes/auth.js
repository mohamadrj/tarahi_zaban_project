const express = require('express');
const router = express.Router();
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator');
const { findOne } = require('../models/User');

const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error...' });
  }
});

router.get('/allusers', auth, async (req, res) => {
  try {
    const user = await User.find().select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error...' });
  }
});

// @route         POST api/users
// @desc          Register a user
// @access        Public
router.post(
  '/',
  [
    check('email', 'Please include a valid  a email').isEmail(),
    check('password', 'Please include a valid a password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        await res.status(400).json({ msg: 'Invalid Credential' });
      }

      const isMatch = await bcyrpt.compare(password, user.password);
      if (!isMatch) {
        await res.status(400).json({ msg: 'Invalid Credential' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

router.put('/allusers/:id', auth, async (req, res) => {
  const { name, email } = req.body;

  const userField = {};
  if (name) formField.name = name;
  if (email) formField.email = email;

  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userField },
      { new: true }
    );

    res.json(form);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/allusers/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    await User.findOneAndRemove(req.params.id);

    res.json({ msg: 'User Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error...' });
  }
});

module.exports = router;
