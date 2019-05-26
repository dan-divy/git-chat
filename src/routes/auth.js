const express = require("express");
const router = express.Router();
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const db = require("../utils/handlers/database");
const config = require('../config/config');


passport.use(new GitHubStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
    scope: 'user,repo'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    db.findOrCreate(profile, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.user = req.session.passport;
    res.redirect('/');
});

module.exports = router;
