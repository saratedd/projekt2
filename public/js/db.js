const {Pool} = require('pg');
const dotenv = require('dotenv')
dotenv.config()

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432,
    ssl: process.env.SSL ? true : false
});

module.exports = pool;