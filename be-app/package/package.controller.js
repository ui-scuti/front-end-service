const express = require('express');
const router = express.Router();
const userService = require('./user.service');

const { log } = require('../log');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/token', getTokenObjectDecoded);
router.get('/permissions', getPermissions);
router.get('/', getAll);
router.get('/isadmin/:id', isAdmin);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    const body = req.body;
    body.isadmin = false;
    userService.create(body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function isAdmin(req, res, next) {
    userService.getById(req.params.id)
        .then(user => {
            console.log(JSON.stringify(user));

            if (user) {
                if (user.isadmin) {
                    res.send(true);
                } else {
                    res.send(false)
                }
            }
            else {
                res.sendStatus(404)
            }
        }
        )
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getPermissions(req, res, next) {
    log.info(`Getting permissions for ${req.params.id}`);
    userService.getPermissions(req)
        .then((perms) => res.json(perms))
        .catch(err => next(err));
}

function getTokenObjectDecoded(req, res, next) {
    log.info(`Getting token decoded ${req.body.token}`);
    userService.getTokenObjectDecoded(req.body.token)
        .then((obj) => res.json(obj))
        .catch(err => next(err));
}