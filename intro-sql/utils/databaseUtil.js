const mysql = require('mysql2');

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Cutie046322",
    database:"airbnb",
});

module.exports = pool.promise();