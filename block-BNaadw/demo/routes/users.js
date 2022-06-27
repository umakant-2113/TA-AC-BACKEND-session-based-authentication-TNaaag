var express = require('express');
const User = require('../models/User');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('home');
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

// capture the data

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.redirect('/users/login');
  });
});

// login page render

router.get('/login', (req, res, next) => {
  res.render('login');
});

// post date login page

router.post('/login', (req, res, next) => {
  let { email, password } = req.body;
  if (!email && !password) {
    return res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.redirect('/users/login');
    }
    user.verifyPassword(password, (err, result) => {
      if (!result) {
        return res.redirect('/users/login');
      }
      req.session.userId = user.id;
      if (req.session.userId) {
        res.redirect('/articles');
      }
    });
  });
});

//logout
router.get('/logout', (req, res) => {
  res.clearCookie('connect.sid');
  req.session.destroy();
  res.redirect('/users/login');
});

// find all article list
// router.get("/:userId/articles",(req,res,next)=>{
//   let userId= req.params.userId;
//   console.log(userId)
//   Article.findById (userId).populate("artcleId").exec((err,user)=>{
//     if(err) return next(err);
//     res.render("articleList",{userId,user});
//   })
// })

module.exports = router;
