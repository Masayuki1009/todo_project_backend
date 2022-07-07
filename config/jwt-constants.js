const jwtConstants = Object.freeze({
    JWT_SECRET: process.env.JWT_SECRET ||'sahisjwjdijidjowjdojqwos',
    JWT_EXPIRE_IN: process.env.JWT_EXPIRES_IN ||'86400000',
});

module.exports = jwtConstants;