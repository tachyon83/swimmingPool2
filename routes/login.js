const express = require('express');
const router = express.Router()
const passport = require('passport');
const passportConfig = require('../config/passportLocal')
passportConfig();

// router.post('/attempt', passport.authenticate('local', {
router.get('/attempt', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    // failureMessage:false,
    // 이거를 프론트에서 어떻게 받는건지는 제가 알아볼게요
}), (req, res) => {
    console.log('authentication complete - success!')
    req.session.save(function () {
        console.log('req.session.passport', req.session.passport)
        res.redirect('/admin');
    })
})

module.exports = router