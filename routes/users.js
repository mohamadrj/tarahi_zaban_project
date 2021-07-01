const express = require('express');
const router = express.Router();
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');
const { findOne } = require('../models/User');

const User = require('../models/User');

// @route         POST api/users
// @desc          Register a user
// @access        Public
router.post(
  '/',
  [
    check('name', 'name is not reqired').not().isEmpty(),
    check('email', 'Enter email').isEmail(),
    check('password', 'Enter a correct Pass').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ msg: 'user already exist' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcyrpt.genSalt(10);

      user.password = await bcyrpt.hash(password, salt);

      await user.save();

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

module.exports = router;
