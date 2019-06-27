/*******************************************************************************
 * User Controller
 ******************************************************************************/
'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Config = require('../config/config');
const reformatErrors = require('../lib/mongoose-errors');
var Jwt = require('jsonwebtoken');
const CommonHelper = require('../helpers/common')
//const UserTransformer = require('../transformers/user');

module.exports = {
    index: function (req, res) {
        res.send({ "message": "Working server" });
    },

    getUsers: function (req, res) {
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

    addUser: function (req, res) {
        var body = req.body;
        console.log(body)
        var user = new User(body);
        user.save(function (err, usr) {
            if (!err) {

                console.log(user)
                res.status(200).send({
                    success: true,
                    message: 'success',
                    data: user
                });
            } else {
                console.log(err);
                res.status(500).send({
                    success: false,
                    message: 'Error in save user',
                    data: err
                });
            }
        })
    },

    addProduct: function (req, res) {
        var body = req.body;
        console.log(body)
        var user = new User(body);
        user.save(function (err, user) {
            if (!err) {
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
    },
    addLogin: function (req, res) {
        console.log("hello")
        User.findOne({ $or: [{ userName: req.body.userName }, { email: req.body.email }] }, function (err, user) {
            if (!err) {
                if (user === null) {
                    return res.status(400).send({
                        success: false,
                        message: "User Not Found. Please enter valid credentials.",
                        data: err
                    });
                }
                if (req.body.password === CommonHelper.decrypt(user.password)) {
                    var loginData = {
                        id: user._id,
                        userName: req.body.userName,
                        email: req.body.email
                    };
                    var token = Jwt.sign(loginData, Config.key.privateKey);
                    res.status(200).send({
                        success: true,
                        message: 'success',
                        data: user,
                        token: token
                    });

                } else {
                    res.status(500).send({
                        success: false,
                        message: "Invalid username or password",
                        data: err
                    });
                }
            } else {
                res.status(500).send({
                    success: false,
                    message: "Invalid username or password",
                    data: err
                });
            }
        });
    },

    addSignup: function (req, res) {
        User.findOne({ userName: req.body.userName }, function (err, user) {
            if (user) {
                return res.status(400).send({
                    success: false,
                    message: 'The username is already taken',
                    data: err
                });
            }
            User.findOne({ email: req.body.email }, function (err, user) {
                if (user) {
                    return res.status(400).send({
                        success: false,
                        message: 'The email is already taken',
                        data: err
                    });
                }
                req.body.password = CommonHelper.encrypt(req.body.password);


                var user = new User(req.body);
                user.save(function (err, user) {
                    if (!err) {
                        var signupData = {
                            id: user._id,
                            userName: req.body.userName,
                            email: req.body.email
                        };
                        var token = Jwt.sign(signupData, Config.key.privateKey);
                        res.status(200).send({
                            success: true,
                            message: 'Your registration has been successfully done.',
                            data: user,
                            token: token
                        });

                    } else {
                        res.status(500).send({
                            success: false,
                            message: 'Error in save user',
                            data: err
                        });
                    }
                });
            });
        });
    },
    getProfile: function (req, res) {
        console.log(req.auth.credentials.id)
        User.findOne({_id:req.auth.credentials.id},function(err,user){

        if (!err) {
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
});
}
}
