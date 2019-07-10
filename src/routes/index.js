const express = require("express");
const router = express.Router();
const db = require("../utils/handlers/database");

router.get("/", (req, res) => {
  res.render("index", { user: req.session.user });
});

module.exports = router;
