const express = require('express');
const router = express.Router()
const passport = require('passport');

// passportConfig is called in app.js
// does not have to call it here

// router.post('/attempt', passport.authenticate('local', {
//     failureRedirect: '/login/failed',
//     failureFlash: true,
// }), (req, res) => {
//     console.log('authentication complete - success!')
//     req.session.save(function () {
//         res.json({ response: true })
//         return
//     })
// })

// server side and client side are separate. better use custom callback
router.post('/attempt', (req, res, next) => {
    passport.authenticate('local', (err, member, info) => {
        if (err) return next(err);
        if (member) {
            // when using custom callback, need to use req.logIn()
            req.logIn(member, (err) => {
                if (err) return next(err)
                // res.cookie('username', member.id, { maxAge: 30000 })
                console.log('login successful')
                return res.json({ response: member.id })
            })
        } else {
            console.log(req.flash('error'))
            console.log('login failed')
            res.json({ response: false })
        }
    })(req, res, next)
})

module.exports = router