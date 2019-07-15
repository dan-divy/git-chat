const express = require("express");
const router = express.Router();

router.get("/:username", (req, res, next) => {
  if (!req.params.username) {
    return next();
  }
  if (req.params.username != req.session.user.username) {
    const fetch = require("axios");
    fetch({
      method: "GET",
      url: `https://api.github.com/users/` + req.params.username
    })
      .then(response => {
        const u = response.data;
        return res.render("user/user", {
          u
        });
      })
      .catch(err => {
        return res.status(404).send("No user found");
      });
    return;
  }
  return res.render("user/index");
});

router.get("/:username/fetch", (req, res, next) => {
  if (req.params.username != req.session.user.username)
    return res.redirect("/");
  //if (req.session.user.repos.length > 0) {
  //res.redirect(`/${req.session.user.username}/`);
  //}
  res.render("user/load");
});

module.exports = router;
