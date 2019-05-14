var express = require('express');
var router = express.Router();
var path = require('path');
var tool = require('array-tools');

router.get('/', (req, res) => {
	res.sendStatus(200);
})

module.exports = router;
