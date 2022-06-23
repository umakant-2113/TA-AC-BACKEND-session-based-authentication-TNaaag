var express = require('express');
var router = express.Router();

let User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req.session)
  res.send('respond with a resource');
});

router.get('/register', (reqq, res, next) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, users) => {
    res.redirect('/users/login');
  });
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.redirect('/users/login');
    }
    user.varifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        return res.redirect('/users/login');
      }
      req.session.ID = user._id;
res.redirect('/users')
    });
  });
});

module.exports = router;
