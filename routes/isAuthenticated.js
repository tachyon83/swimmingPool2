const express = require('express');
const router = express.Router()

router.route('/').get((req, res) => {
    if (req.user) res.json({ response: true })
    else res.json({ response: false })
})

module.exports = router