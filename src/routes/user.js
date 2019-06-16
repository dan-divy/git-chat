const express = require("express");
const router = express.Router();
const sio = require('../../bin/www').sio;

router.get('/:username', (req, res, next) => {
    if(!req.params.username) {
        return next();
    }
    if(!req.session.user || req.params.username != req.session.user.username) {
        return next();
    }
    return res.render('user/index', {user: req.session.user});
});

router.get('/:username/fetch', (req, res, next) => {
    res.render('user/load', {user:req.session.user});
})

module.exports = router;
