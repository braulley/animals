var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'sql9.freemysqlhosting.net',
  user     : 'sql9270537',
  password : 'LZf7enr4pa',
  database : 'sql9270537'
});


module.exports = connection;