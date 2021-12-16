const mysql = require("mysql");
const dbConfig = require('../config/db-config')

const initPool = () => {

    const pool = mysql.createPool({
        password: dbConfig.DB_PASSWORD,
        user: dbConfig.DB_USER,
        database: dbConfig.DB_NAME,
        host: dbConfig.DB_HOST,
        port: dbConfig.DB_PORT,
        multipleStatements: true
        //追加
    })

    return pool
}

module.exports = initPool;