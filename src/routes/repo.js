const express = require("express");
const router = express.Router();
const db = require("../utils/handlers/database");

router.get("/", (req, res) => {
  res.redirect("/");
});

router.get("/:user/:repo", (req, res) => {
  db.get(
    { "value.full_name": `/${req.params.user}/${req.params.repo}` },
    (err, repo) => {
      if (repo) return res.render("repo/repo");
      res.render("repo/load");
    }
  );
});

module.exports = router;
