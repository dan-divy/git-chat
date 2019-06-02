const express = require("express");
const router = express.Router();
const get = require('got');

router.all("/*", (req, res, next) => {
	if(!req.session.user) {
		return res.status(404).send({error: "session", msg: "User is not logged in"});
	} else {
		next();
	}
});

router.get("/user/repos", (req, res) => {
	console.log(req.session.user.repos_url)
	get(req.session.user.repos_url, {json:true}).then(response => {
		return res.send(response.body);
	});
});

module.exports = router;
