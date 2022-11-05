const express = require('express')
const router = express.Router()
const pool = require('../public/js/db')
const dbSetup = require('../public/js/setup')


router.get('/', (req, res) => {

    pool.query(dbSetup, (err, res, f) => {
        // console.log(res);
    })

    res.render('vul', {
        text : 'joj'
    })
})

router.post('/', (req, res) => {
    var user = req.body.user
    var pass = req.body.pass
    console.log(body);
    res.render('vul', {
        text: body
    })
})



module.exports = router