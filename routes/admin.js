const express = require('express');
const router = express.Router()
const poolDao = require('../models/PoolDAO')

router.route('/board').get((req, res) => {
    poolDao.showAdminBoard((err, result) => {
        if (err) res.status(500);
        res.json(result);
    })
})

module.exports = router