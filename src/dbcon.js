// dbcon.js database connection file for GeminiDB

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'geminidb467.cke8aoevzjyc.us-east-1.rds.amazonaws.com',
	port: 3306,
    user: { username },
    password: { password },
    database: 'geminidb'
});
module.exports.pool = pool;