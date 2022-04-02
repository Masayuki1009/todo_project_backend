// const express = require("express");
const jwt = require("jsonwebtoken")
const jwtConstants = require('../config/jwt-constants')

const handleAuth = () => async (req, res, next) => {
  try {

    const token = req.get('authorization')?.slice(7);
    if (!token) return res.status(401).send('unauthorized');
    // unauthorizedされてる！！！/

    const decoded = jwt.verify(token, jwtConstants.JWT_SECRET);

    if (!decoded) return res.status(401).send('unauthorized');
    req.email = decoded;

    next();
  } catch (error) {
    return res.status(401).send('unauthorized');
  }
};

module.exports = handleAuth;