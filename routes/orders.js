const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Form = require('../models/Form');

router.get('/usersList', function (req, res) {
  Form.find({}, function (err, forms) {
    var formMap = {};

    forms.forEach(function (form) {
      formMap[form._id] = form;
    });

    res.send(formMap);
  });
});
