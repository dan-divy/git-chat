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

app.get('/',
  passport.authenticate('github'));

app.get('/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = app;