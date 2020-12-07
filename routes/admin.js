const express = require('express');
const router = express.Router()
const poolDao = require('../models/PoolDAO')

router.route('/board')
    .get((req, res) => {
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
            if (err) {
                console.error(err)
                res.status(500);
            }
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
    .get((req, res) => {
        poolDao.findDetailById(req.params.id, (err, result) => {
            if (err) res.status(500);
            res.json(result);
        })
    })
    .delete((req, res) => {
        poolDao.delete(req.params.id, (err, result) => {
            if (err) res.status(500);
            res.json(result)
        })
    })

module.exports = router