// Here define the Database
require('dotenv').config();
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0
});

pool.getConnection((err, conn) => {
    if (conn) {
        console.log("connected");
        return;
    }
    console.log(err);
})
module.exports = pool;