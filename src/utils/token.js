const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtconfig = {
  expiresIn: '3d',
  algorithm: 'HS256',
};

const createToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, jwtconfig);
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { data: decoded };
  } catch (error) {
    if (error.message.includes('malformed') || !token) {
      return { status: 401, data: { message: 'Token not found' } };
    }
    return { status: 401, data: { message: 'Invalid token' } };
  }
};

module.exports = { createToken, verifyToken };
