const express = require('express');
const router = express.Router()
const passport = require('passport');

router.post('/attempt', passport.authenticate('local', {
    failureRedirect: '/login',
    // failureMessage:false,
}), (req, res) => {
    console.log('authentication complete - success!')
    req.session.save(function () {
        console.log(req.session.passport)
        res.redirect('/');
    })
})
// router.route('/logout').get((req, res) => {
//     req.logout();
//     req.session.save(function () {
//         res.redirect('/');
//     })
// })

module.exports = router