const util = require("util");
const mysql = require("mysql");

// Pulled from miniproject, substituting songs for workers
const connection = mysql.createConnection({
  host: 'localhost',

  
  port: 3000,

  
  user: 'killme',

  // Be sure to update with your own MySQL password!
  password: 'help',
  database: 'workers',
});
connection.connect();

connection.connect((err) => {
  if (err) throw err;
  // this is from the miniproject too
});


// 
//
connection.query = util.promisify(connection.query);

module.exports = connection;
