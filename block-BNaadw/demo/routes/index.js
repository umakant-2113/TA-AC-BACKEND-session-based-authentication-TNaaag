var express = require('express');
let User=require("../models/User")
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("home")
});

// register form




module.exports = router;
