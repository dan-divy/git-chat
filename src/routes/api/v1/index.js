const express = require("express");
const router = express.Router();

router.all("/*", (req, res, next) => {
	if(!req.session.user) {
		return res.status(404).send({error: "session", msg: "User is not logged in");
	}
})

module.exports = router;
