const express = require('express');
const router = express.Router()
const passport = require('passport');

router.post('/attempt', passport.authenticate('local', {
    failureRedirect: '/login',
    // failureMessage:false,
    // 이거를 프론트에서 어떻게 받는건지는 제가 알아볼게요
}), (req, res) => {
    console.log('authentication complete - success!')
    req.session.save(function () {
        console.log(req.session.passport)
        res.redirect('/admin');
    })
})
// router.route('/logout').get((req, res) => {
//     req.logout();
//     req.session.save(function () {
//         res.redirect('/');
//     })
// })

module.exports = router