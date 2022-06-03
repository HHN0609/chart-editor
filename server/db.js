const mysql = require("mysql");
const { db } = require("./config");
module.exports = mysql.createConnection(db);