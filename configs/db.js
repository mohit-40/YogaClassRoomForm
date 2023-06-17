const mysql = require("mysql");
require("dotenv").config();

var pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  connectionLimit: 10,
  supportBigNumbers: true,
});

exports.pool = pool;
