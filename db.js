
// db.js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost', 
  user: 'livraria', 
  password: '1234',
  database: 'livraria',
  connectionLimit: 5
});

module.exports = pool;
