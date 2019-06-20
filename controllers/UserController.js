/*******************************************************************************
 * User Controller
 ******************************************************************************/
'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Config = require('../config/config');
const reformatErrors = require('../lib/mongoose-errors');
//const UserTransformer = require('../transformers/user');

module.exports = {
    index: function (req, res) {
        res.send({ "message": "Working server" });
    },

    getUsers: function(req, res) {
        User.find({}, function (err, users) {
            if (!err) {
                res.status(200).send({
                    success: true,
                    message: 'success',
                    data: users
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: 'Data not found',
                    data: null
                });
            }
        });
    },

    addUser: function(req, res) {
        var body = req.body;
        var user = new User(body);
        user.save(function(err, user) {
            if( !err ) {
                res.status(200).send({
                    success: true,
                    message: 'success',
                    data: user
                });
            } else {
                res.status(500).send({
                    success: false,
                    message: 'Error in save user',
                    data: err
                });
            }
        })
    }
};
