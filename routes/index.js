const express = require('express');
const router = express.Router();
const ta = require('time-ago');
const array_tools = require("array-tools");

router.get('/', (req, res) => {
  res.render('index');
})

module.exports = router;
