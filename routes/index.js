var express = require('express');
var router = express.Router();
var ta = require('time-ago');
var array_tools = require("array-tools");

router.get('/', (req, res) => {
  res.render('index');
})

module.exports = router;
