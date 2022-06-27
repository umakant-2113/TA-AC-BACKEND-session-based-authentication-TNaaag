var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');

router.use(cookieParser());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.cookie("name", "mukesh")
  res.send("hello")
});


module.exports = router;
