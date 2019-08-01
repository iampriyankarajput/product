/*******************************************************************************
 * Admin Routes
 ******************************************************************************/
'use strict';
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController');
const auth = require('../helpers/auth').validate;

const async = require('async');


module.exports = function (app) {
    app.get('/users', function (req, res) {
        UserController.getUsers(req, res);
    });

    app.post('/user', function (req, res) {
        UserController.addUser(req, res);
    });

    app.get('/api/user/profile/', auth, function (req, res) {
        UserController.getProfile(req, res);
    });

    app.put('/api/user/profile/', auth, function (req, res) {
        UserController.updateProfile(req, res);
    });
    
    app.put('/api/changepassword', auth, function (req, res) {
        UserController.changePassword(req, res);
    });

    app.get('/api/verify/email/:token',auth, function (req, res) {
        UserController.verifyEmail(req, res);
    });
    

};
