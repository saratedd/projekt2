const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res/*.send('homepage')*/.status(200)
    res.render("index", {
        text: "welcome text"
    })
})


app.listen(3000)