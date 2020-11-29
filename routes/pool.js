const express = require('express');
const router = express.Router()
const poolDao = new (require('../models/PoolDAO'))

router.route('/')
    .get((req, res) => {
        console.log(req.query)
        poolDao.findList(req.query, (err, result) => {
            if (err) res.status(500);
            res.json(result);
        })
    })
router.route('/:id')
    .get((req, res) => {
        if (!req.query.searchWord) {
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

module.exports = router