const express = require("express");
const router = express.Router();
const db = require('../utils/handlers/database');

router.get("/", (req, res) => {
  res.render("index", {user: req.session.user});
});

router.get("/cache", (req,res) => {
  if(req.session.user && req.session.user.id) {
    db.get({_id: req.session.user._id.toString()}, function(err, user) {
        req.session.user = user.value
    })
  }
  res.redirect('/');
})

module.exports = router;
