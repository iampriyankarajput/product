/*******************************************************************************
 * Admin Routes
 ******************************************************************************/
'use strict';
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController');

module.exports = function(app) {
    app.get('/', function(req, res) {
        UserController.index(req, res);
    });

    app.get('/users', function(req, res) {
        UserController.getUsers(req, res);
    });

    app.post('/user', function(req, res) {
        UserController.addUser(req, res);
    });
    
};
