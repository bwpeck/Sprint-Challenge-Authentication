const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');
const restricted = require('./authenticate-middleware');

router.post('/register', (req, res) => {
    let user = req.body;

    if (!user.username || !user.password) {
        res.status(404).json({ message: 'No username or password submitted.' });
    }
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    Users.add(user)
        .then((saved) => {
            res.status(201).json(saved);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});