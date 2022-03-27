const mysql = require('mysql');
const connection = mysql.createConnection({
  connectionLimit : 100,
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '',
  database: 'v2a_db',
  dateStrings: 'date'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

module.exports = {
    getConnection: () => {
        if (!connection) {
            connection.connect();
        }
        return connection;
    }
}