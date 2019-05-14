const express = require('express');
const router = express.Router();
const path = require('path');
const tool = require('array-tools');

router.get('/', (req, res) => {
	res.sendStatus(200);
})

module.exports = router;
