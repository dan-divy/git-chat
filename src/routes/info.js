const express = require("express");
const router = express.Router();
const db = require("../utils/handlers/database");

router.get("/cache", (req, res) => {
  if (req.session && req.session.user && req.session.user.id) {
    db.get({ key: req.session.user.id.toString() }, function(err, user) {
      req.session.user.repos = user.value.repos;
      return res.redirect("/" + user.value.username);
    });
    return;
  }
  res.redirect("/");
});

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
