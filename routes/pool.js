// module.exports=(app)=>{
//     const express = require('express')
//     const router = express.Router()
//     const poolDao = new (require('../models/PoolDAO'))

//     router.route('/:id')
//     .get((req, res) => {
//         if (!req.query.searchWord) {
//             poolDao.findDetailById(req.params.id, (err, result) => {
//                 if (err) res.status(500);
//                 res.json(result);
//             })
//         } else {
//             poolDao.findList(req.query, (err, result) => {
//                 if (err) res.status(500);
//                 res.json(result);
//             })
//         }
//     })
//     .post((req, res) => {
//     })
//     .put((req, res) => {
//     })
//     .delete((req, res) => {
//     })



// }

const express = require('express');
const router = express.Router()
// const passport = require('passport');
// const passportConfig = require('../config/passportLocal')
// const bodyParser = require('body-parser')

// app.use(passport.initialize());
// app.use(passport.session());
// passportConfig();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json())

const poolDao = new (require('../models/PoolDAO'))

// router.post('/login/attempt', passport.authenticate('local', {
//     failureRedirect: '/login',
//     // failureMessage:false,
// }), (req, res) => {
//     console.log('authentication complete - success!')
//     req.session.save(function () {
//         console.log(req.session.passport)
//         res.redirect('/');
//     })
// })

router.route('/:id')
    .get((req, res) => {
        console.log(req.query)
        if (!req.query.searchWord) {
            console.log('detail')
            poolDao.findDetailById(req.params.id, (err, result) => {
                if (err) res.status(500);
                res.json(result);
            })
        } else {
            poolDao.findList(req.query, (err, result) => {
                if (err) res.status(500);
                res.json(result);
            })
        }
    })
    .post((req, res) => {
    })
    .put((req, res) => {
    })
    .delete((req, res) => {
    })

// router.route('/logout').get((req, res) => {
//     req.logout();
//     req.session.save(function () {
//         res.redirect('/');
//     })
// })

module.exports = router