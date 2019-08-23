const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const session = require('express-session');
const SessionStore = require('connect-session-knex')(session);

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();


const sessionConfig = {
    name: 'pandapandapanda',
    secret: 'keep it simple, stupid',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 70 * 70 * 1000,
        secure: false,
        httpOnly: true
    },
    store: new SessionStore({
        knex: require('../database/dbConfig'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 70 * 70 * 1000
    })
};


server.use(session(sessionConfig));
server.use(helmet());
server.use(cors());
server.use(express.json());
server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);
server.use('/api/users', usersRouter);
module.exports = server;