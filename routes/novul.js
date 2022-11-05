const express = require('express')
const router = express.Router()
var format = require('pg-format');
const pool = require('../public/js/db')
const dbSetup = require('../public/js/setup')

router.use(express.json())

const attrs = ['user_id', 'user_name', 'user_password']

router.get('/', (req, res) => {

    pool.query(dbSetup, (err, resu, f) => {
    })

    res.render('vul', {
        auth: false,
        text : 'joj',
        users: ''
    })
})
// ' or 1=1--
router.post('/', (req, res) => {
    var user = req.body.user
    var pass = req.body.pass
    var auth = false
    if (user && pass) auth = true
    var sql = `select * from users where user_name like '${user}' and user_password like '${pass}'`

    pool.query(sql, (err, result, f) => {
        if (err) {
            console.log(err)
            throw err
        } else {
            console.log(result);
            res.render('vul', {
                auth: auth,
                users: result.rows,
                attrs: attrs,
                user: user,
                pass: pass
            })
        }
    })
})

module.exports = router