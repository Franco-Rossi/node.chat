const express = require('express');

const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

router.post('/', (req, res) => {
    controller
        .addChat(req.body.users)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, 'Internal error', 500, e);
        });
});

router.get('/:userId', (req, res) => {
    controller
        .listChats(req.query.userId)
        .then(users => {
            response.success(req, res, users, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
});

module.exports = router;
