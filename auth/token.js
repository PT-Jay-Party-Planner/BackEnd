const secret = require('../api/secrets.js');

const jwt = require('jsonwebtoken');

generateToken = user => {

  const payload = {
    subject: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '2h'
  }

  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = generateToken;