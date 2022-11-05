const express = require('express')
const app = express()

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