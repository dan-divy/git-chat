var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var githubAuthConfig = require('../config/config').github;
var express = require('express');
var app = express.Router();

passport.use(new GitHubStrategy(githubAuthConfig, function(accessToken, refreshToken, profile, cb) {
  console.info(profile);  
  User
  .findOne({ id: profile.id })
  .exec(function (err, user) {
      if(err) throw err;
      if(user) return cb(null, user);
      var newProfile = new User({
        id: profile.id,
        username: profile.username,
        email: profile.email
      });
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
    req.session.user = req.session.passport.user.value
    res.redirect('/');
});

module.exports = router;
