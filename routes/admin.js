const express = require('express');
const router = express.Router()
const poolDao = require('../models/PoolDAO')

router.route('/').get((req, res) => {
    res.end('finally...')
})

router.route('/board')
    .get((req, res) => {
        console.log(req.session.passport)
        poolDao.showAdminBoard((err, result) => {
            if (err) res.status(500);
            res.json(result);
        })
    })

router.route('/pool')
    .get((req, res) => {
        poolDao.findList(req.query, (err, result) => {
            if (err) res.status(500);
            res.json(result);
        })
    })
    .post((req, res) => {
        poolDao.create(req.body.information, (err, result) => {
            if (err) res.status(500);
            res.json(result);
        })
    })
    .put((req, res) => {
        poolDao.update(req.body.information, (err, result) => {
            if (err) res.status(500);
            res.json(result)
        })
    })

router.route('/pool/:id')
    .delete((req, res) => {
        poolDao.delete(req.params.id, (err, result) => {
            if (err) res.status(500);
            res.json(result)
        })
    })

module.exports = router