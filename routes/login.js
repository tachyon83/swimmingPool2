const express = require('express');
const router = express.Router()
const passport = require('passport');

// passportConfig is called in app.js
// does not have to call it here
// const passportConfig = require('../config/passportLocal')
// passportConfig();

const check = (req, res, next) => {
    console.log('req.body', req.body);
    next();
}

router.get('/', (req, res) => {
    res.json({ response: true })
})

// router.post('/attempt', check, passport.authenticate('local', {
// router.get('/attempt', check, passport.authenticate('local', {
//     failureRedirect: '/login/failed',
//     failureFlash: true,
// }), (req, res) => {
//     console.log('authentication complete - success!')
//     req.session.save(function () {
//         console.log('req.session.passport', req.session.passport)
//         res.json({ response: true })
//         // res.redirect('https://localhost:3001/admin');
//         return
//     })
// })

// router.get('/attempt', check, (req, res, next) => {
router.post('/attempt', check, (req, res, next) => {
    passport.authenticate('local', (err, member, info) => {
        if (err) return next(err);
        if (member) {
            console.log('req.user: ', member)

            // when using custom callback, need to use req.logIn()
            req.logIn(member, (err) => {
                if (err) return next(err)
                res.cookie('username', member.id, { maxAge: 30000 })
                return res.json({ response: member.id })
            })
        } else {
            console.log('login failed')
            res.json({ response: false })
        }
    })(req, res, next)
})

// router.get('/failed', (req, res) => {
//     console.log('failed')
//     let resp = req.flash('error')
//     console.log('flash message', resp)
//     res.end(resp[0])
// })

module.exports = router