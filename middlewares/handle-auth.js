const jwt = require("jsonwebtoken")
const jwtConstants = require('../config/jwt-constants')

const handleAuth = () => async (req, res, next) => {
  try {
    console.log("handleAuth通ってる！")
    const token = req.get('authorization')?.slice(7);
    if (!token) return res.status(401).send('unauthorized');

    const decoded = jwt.verify(token, jwtConstants.JWT_SECRET);

    if (!decoded) return res.status(401).send('unauthorized');
    req.user = decoded//reqにpropertyを付与するコード

    next();
  } catch (error) {
    return res.status(401).send('unauthorized');
  }
};

module.exports = handleAuth;