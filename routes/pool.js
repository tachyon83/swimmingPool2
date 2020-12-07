const express = require('express');
const router = express.Router()
const poolDao = require('../models/PoolDAO')

router.route('/')
    .get((req, res) => {
        console.log('querystring: ', req.query)
        poolDao.findList(req.query, (err, result) => {
            console.log('findlist ?')
            if (err) {
                console.error(err)
                res.status(500);
            }
            res.json(result);
        })
    })

router.route('/:id')
    .get((req, res) => {
        poolDao.findDetailById(req.params.id, (err, result) => {
            if (err) {
                console.error(err)
                res.status(500);
            }
            res.json(result);
        })
    })

module.exports = router