const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function generateToken(userId, email, role) {

  const payload = {
    sub: userId,
    email:email,
    role:role,
    iat: Date.now(),
  };

  const options = {
    expiresIn: '7d', // Token expiration time (e.g., 7 days)
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function userObjectWithoutPassKey(userData){
    delete userData.password;
    return userData;
}

module.exports = {
  generateToken,
  userObjectWithoutPassKey,
};