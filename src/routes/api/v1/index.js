const express = require("express");
const router = express.Router();
const fetch = require('axios');

router.all("/*", (req, res, next) => {
	if(!req.session.user) {
		return res.status(404).send({error: "session", msg: "User is not logged in"});
	} else {
		next();
	}
});

router.get("/user/repos", (req, res) => {
	fetch(req.session.user.repos_url).then(response => {
		return res.send(response.data);
	});
});

module.exports = router;
