const express = require("express");
const router = express.Router();

router.get('/:username', (req, res, next) => {
    if(!req.params.username) {
        return next();
    }
    if(!req.session.user || req.params.username != req.session.user.username) {
        return res.redirect('/');
    }
    return res.render('user', {user: req.session.user});
})

module.exports = router;
