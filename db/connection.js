const mysql = require("mysql");
const dbConfig = require('../config/db-config')

    const pool =  mysql.createPool({
        password: dbConfig.DB_PASSWORD,
        user: dbConfig.DB_USER,
        database: dbConfig.DB_NAME,
        host: dbConfig.DB_HOST,
        port: dbConfig.DB_PORT,
        multipleStatements: true

    })


// basecode of access query
const queryMySQL = (query, paramValues) => {
    const promise = new Promise((resolve, reject) => {
      pool.query(query, paramValues, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
    return promise;
  };


module.exports = queryMySQL;
