/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const db = require('./data')();

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

module.exports = (req, res, next) => {
    next();
};