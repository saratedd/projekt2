const express = require('express')
const router = express.Router()
var format = require('pg-format');
const pool = require('../public/js/db')
const dbSetup = require('../public/js/setup')

router.use(express.json())

const attrs = ['user_id', 'user_name', 'user_password']
var timeout = 0

router.get('/', (req, res) => {

    pool.query(dbSetup, (err, resu, f) => {
    })

    res.render('novul', {
        auth: false,
        users: '',
        prijava: false
    })
})
// ' or 1=1--
router.post('/', (req, res) => {
    var user = req.body.user
    var pass = req.body.pass
    var auth = false
    if (user && pass) auth = true

    if (vulCheck(user, pass)) {
        // console.log('nismo ok');
        timeout++
        if (timeout == 3) {
            res.render('novul', {
                auth: false,
                users: '',
                attrs: attrs,
                user: user,
                pass: pass,
                prijava: true,
                timeout: true
            })
        } else if (timeout == 4) {
            timeout = 0
            sleep(5000)
        }// else {
            res.render('novul', {
                auth: false,
                users: '',
                attrs: attrs,
                user: user,
                pass: pass,
                prijava: true,
                timeout: false
            })
        // }
    } else {
        // console.log('ok smo');
        var sql = format(`select * from users where user_name like '%s' and user_password like '%s'`, user, pass)
    
        pool.query(sql, (err, result, f) => {
            if (err) {
                console.log(err)
                throw err
            } else {
                // console.log(result.rows);
                res.render('novul', {
                    auth: auth,
                    users: result.rows,
                    attrs: attrs,
                    user: user,
                    pass: pass,
                    prijava: true,
                    timeout: false
                })
            }
        })
    } 
})

function vulCheck(user, pass) {
    if (user == '' || pass == '' ||
        typeof user != 'string' || typeof pass != 'string' ||
        user.includes(' ') || pass.includes(' ') ||
        user.includes('"') || pass.includes('"') ||
        user.includes("'") || pass.includes("'"))
        return true
    return false
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

module.exports = router