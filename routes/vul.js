const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    // res.send('vul').status(200)
    res.render('vul', {
        text : 'ja sam vul'
    })
})

module.exports = router