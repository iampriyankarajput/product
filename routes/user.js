/*******************************************************************************
 * Admin Routes
 ******************************************************************************/
'use strict';
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController');
const auth = require('../helpers/auth').validate;

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

    // app.post('/product', function(req, res) {
    //     UserController.addProduct(req, res);
    // });

    app.post('/login', function(req, res) {
        UserController.addLogin(req, res);
    });

    app.post('/sign', function(req, res) {
        UserController.addSignup(req, res);
    });

    app.get('/user/profile', auth, function(req, res) {
        UserController.getProfile(req, res);
    });
    

};
