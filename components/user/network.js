const express = require('express');

const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

router.post('/', function(req, res) {
    controller
        .addUser(req.body.name)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, 'Internal error', 500, e);
        });
});

router.get('/', (req, res) => {
    controller
        .getUsers()
        .then(userList => {
            response.success(req, res, userList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
});

module.exports = router;
