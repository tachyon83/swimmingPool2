const express = require('express');
const router = express.Router()
const poolDao = require('../models/PoolDAO')

router.route('/')
    .get((req, res) => {
        poolDao.findList(req.query, (err, result) => {
            if (err) {
                console.log(err)
                res.status(500);
            }
            res.json(result);
        })
    })

router.route('/:id')
    .get((req, res) => {
        poolDao.findDetailById(req.params.id, (err, result) => {
            if (err) {
                console.log(err)
                res.status(500);
            }
            res.json(result);
        })
    })

module.exports = router