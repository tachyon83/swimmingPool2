const express = require('express');
const router = express.Router()

const poolDao = require('../models/PoolDAO')
console.log('pooldao in admin', poolDao)

router.route('/').get((req, res) => {
    console.log(poolDao.dbpool)
})

module.exports = router