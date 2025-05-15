const jwt = require('jsonwebtoken');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30m' });

const generateRefreshToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET_REFRESH, { expiresIn: '7d' });

module.exports = { generateToken, generateRefreshToken };
