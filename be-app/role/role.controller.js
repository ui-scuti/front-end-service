const express = require('express');
const router = express.Router();
const roleService = require('./role.service');

// routes
router.post('/', add);
router.get('/:id', getById);
router.get('/', getAll);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function add(req, res, next) {
    const body = req.body;
    body.isadmin = false;
    roleService.create(body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getById(req, res, next) {
    roleService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    roleService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function update(req, res, next) {
    roleService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    roleService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getPermissions(req, res, next) {
    roleService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}