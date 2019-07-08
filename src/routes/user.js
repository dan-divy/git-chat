const express = require("express");
const router = express.Router();

router.get("/:username", (req, res, next) => {
  if (!req.params.username) {
    return next();
  }
  if (!req.session.user || req.params.username != req.session.user.username) {
    return res.redirect("/");
  }
  return res.render("user/index", { user: req.session.user });
});

router.get("/:username/fetch", (req, res, next) => {
  if (req.params.username != req.session.user.username)
    return res.redirect("/");
  //if (req.session.user.repos.length > 0) {
  //res.redirect(`/${req.session.user.username}/`);
  //}
  res.render("user/load", { user: req.session.user });
});

module.exports = router;
