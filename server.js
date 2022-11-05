const express = require('express')
const app = express()

//const pool = require('./public/js/db');
var format = require('pg-format');
const {Pool} = require('pg');

const pool = new Pool({
    user: 'projekt2_user',
    host: 'dpg-cdj2n8ien0honmd0l0gg-a',
    database: 'projekt2',
    password: '5MU4CEBaSLdXE6PmlxuxvF2BKooRQ9fN',
    port: 5432
});


app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(express.json())

// app.get('/', (req, res) => {
//     res/*.send('homepage')*/.status(200)
//     res.render("index", {
//         text: "welcome text"
//     })
// })


const vulRouter = require('./routes/vul')
const novulRouter = require('./routes/novul')
app.use('/vul', vulRouter)
app.use('/novul', novulRouter)

app.use('/:smth', (req, res) => {
    res.send(`The page with this url (localhost:3000/${req.params.smth}) does not exist. Go somewhere else.`).status(404)
})

app.listen(3000)