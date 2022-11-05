const express = require('express')
const router = express.Router()
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
        users: '',
        prijava: false,
        message: ''
    })
})
// ' or 1=1--
router.post('/', async (req, res) => {
    var user = req.body.user
    var pass = req.body.pass
    var auth = false
    if (user && pass) auth = true

    var sql = `select * from users where user_name like '${user}' and user_password like '${pass}'`
    var usersql = `select * from users where user_name like '${user}'`
    var passsql = `select * from users where user_password like '${pass}'`

    var jojuser = await pool.query(usersql)
    var jojpass = await pool.query(passsql)
    console.log(jojuser.rows, jojpass.rows);

    var message = ''
    if (jojuser.rows.length === 0 && jojpass.rows.length === 0) message = 'Korisničko ime i lozinka su neispravni.'
    else if (jojuser.rows.length === 0) message = 'Korisničko ime je neispravno.'
    else if (jojpass.rows.length === 0) message = 'Lozinka je neispravna.'

    pool.query(sql, (err, result, f) => {
        if (err) {
            console.log(err)
            throw err
        } else {
            // console.log(result);
            res.render('vul', {
                auth: auth,
                users: result.rows,
                attrs: attrs,
                user: user,
                pass: pass,
                message: message
            })
        }
    })
})

module.exports = router