var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "emp_auth",
});

connection.connect(function (err) {
  if (err) throw err;

  console.log("Connected at http://localhost:3000");
});

module.exports = connection;
