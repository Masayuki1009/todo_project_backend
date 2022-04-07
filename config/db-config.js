const dbConfig = {
    DB_PASSWORD: process.env.DB_PASSWORD || 'b0a5bad5',
    DB_USER: process.env.DB_USER || 'bf7171c6547132',
    DB_NAME: process.env.DB_NAME || 'heroku_10cf518894d2c26',
    DB_HOST: process.env.DB_HOST || 'eu-cdbr-west-01.cleardb.com',
    DB_PORT: process.env.DB_PORT || "3306"
}

module.exports = dbConfig