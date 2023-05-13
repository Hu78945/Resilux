require("dotenv").config();
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.HOSTID,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
});
module.exports = connection;
