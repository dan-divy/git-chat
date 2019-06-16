var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var config = require('../config/config');
var express = require('express');
var router = express.Router();
var db = require('../utils/handlers/database')

passport.use(new GitHubStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
    scope: 'user,repo'
  },
  function(accessToken, refreshToken, profile, cb) {
    db.findOrCreate(profile, function (err, user) {
      user.value.accessToken = accessToken;
      user.value.username = user.value.login;
      user.value._id = user._id;
      if(user) return cb(null, user.value);
        else return cb(err);
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
    req.session.user = req.session.passport.user;
    res.redirect('/' + req.session.user.username + '/fetch');
});

router.get('/logout', (req,res) => {
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
