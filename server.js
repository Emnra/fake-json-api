/* eslint-disable no-unused-vars */

const fs = require('fs');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('./data')();

const server = jsonServer.create();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// set database
const router = jsonServer.router(db);

// Keep secret key in a safe place
const SECRETE_KEY = 'EDF0RqzVR9S2lQNxdH6Bz2O9ruLUHZZn';

// Create token from payload
const createToken = (payload) => {
    return jwt.sign(payload, SECRETE_KEY, { expiresIn: '5h' });
};

// Verify token
const verifyToken = (token) => {
    return jwt.verify(token, SECRETE_KEY, (err, decode) => decode !== undefined ? decode : err);
};

const findUser = ({ username, password }) => {
    return db.users.find(u => u.username === username && u.password === password);
};

server.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    const user = findUser({ username, password });
    if (!user) {
        res.status(401).json({ message: 'Incorrect email or password', status: 401 });
        return;
    }
    const access_token = createToken({ username, password });
    res.status(200).json({ token: access_token, profile: user.profile });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    // if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    //     const status = 401;
    //     const message = 'Error in authorization format';
    //     res.status(status).json({ status, message });
    //     return;
    // }
    try {
        // verifyToken(req.headers.authorization.split(' ')[1]);
        next();
    } catch (err) {
        const status = 401;
        const message = 'Error access_token is revoked';
        res.status(status).json({ status, message });
    }
});

server.use(jsonServer.defaults());
server.use(router);
server.listen(3000, () => {
    console.log(`Users found: ${db.users.length}`);
    console.log(`Projects found: ${db.projects.length}`);
    console.log(`Chats found: ${db.chats.length}`);
    console.log(`Contacts found: ${db.contacts.length}`);
    console.log(`Todos found: ${db.todos.length}`);
    console.log('Running JSON Faker with auth API');
});