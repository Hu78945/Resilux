require("dotenv").config();
//Good commit
const mysql = require("mysql");
const pool = mysql.createPool({
  host: "database-1.c4qzzxdaaj91.eu-north-1.rds.amazonaws.com",
  user: "admin",
  password: "airbnb789456",
  database: "airbnb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
module.exports = pool;

//ok
