const secrets = require('../config/secrets');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if(token){
    jwt.verify(token, secrets.jwtSecret, (err, decodedToke) => {
      if(err){
        res.status(400).json({ error: 'Token or header is not valid' })
      }else{
        req.jwtToken = decodedToke;
        next();
      }
    })
  }else{
    res.status(401).json({ you: 'shall not pass!' });  }
};