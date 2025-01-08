
// db.js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
	host: 'localhost', 
	user: 'leonna',
  	password: 'alfaceruim22!',
  	database: 'livraria',
  	connectionLimit: 5
});

module.exports = pool;
