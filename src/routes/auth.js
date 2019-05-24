var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var githubAuthConfig = require('../config/config').github;
var express = require('express');
var app = express.Router();

passport.use(new GitHubStrategy(githubAuthConfig, function(accessToken, refreshToken, profile, cb) {
    /**User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });**/
    console.info(profile);
  }
));

app.get('/',
  passport.authenticate('github'));

app.get('/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = app;