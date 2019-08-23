const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('./gentoken-middleware');

const Users = require('../database/dbmodel');
const bodyVerify = require('./body-middleware.js');

router.post('/register', bodyVerify, (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.insert(user)
    .then(registered => {
      res.status(201).json('New User has been added')
    })
    .catch(err => {
      res.status(400).json({ error: 'New User cannot be added' })
    })
});

router.post('/login', bodyVerify, (req, res) => {
  const {username, password} = req.body;

  Users.findByName({username})
    .first()
    .then(foundUser => {
      if(foundUser && bcrypt.compareSync(password, foundUser.password)){
        const token = generateToken(foundUser);
        res.status(201).json({ message: 'You are in', token})
      }else{
        res.status(400).json({ error: 'Invalid Credentials, YA GOOFFFF' })
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'First level error, couldnt attempt to validate credentials' })
    })
});

module.exports = router;