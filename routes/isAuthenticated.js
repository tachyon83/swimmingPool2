const express = require('express');
const router = express.Router()

router.route('/').get((req, res) => {
    console.log('path: /isAuthenticated, prior to login or admin')
    if (req.user) res.json({ response: true })
    else res.json({ response: false })
})

module.exports = router