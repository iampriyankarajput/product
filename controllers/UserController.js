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
const UserTransformer = require('../transformers/user');
const MailHelper = require('../helpers/mail');
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
        user.save(function (err, user) {
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
    login: function (req, res, callback) {
        User.findOne({ $or: [{ email: req.body.email }] }, function (err, user) {
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
                    if(!user.isEmailVerified) {
                        return res.status(400).send({
                            success: false,
                            message: "Your email is not verified Please veirfy email first",
                            data: err
                        });
                    }
                    var token = Jwt.sign(loginData, Config.key.privateKey);
                    console.log("Here ", token)
                    res.status(200).send({
                        success: true,
                        message: 'success',
                        data: UserTransformer(user),
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
                User.findOne({ mobile: req.body.mobile }, function (err, user) {
                    if (user) {
                        return res.status(400).send({
                            success: false,
                            message: 'The mobile no. is already taken',
                            data: err
                        });
                    }
                console.log(req.body)
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
                        user.verifyEmailToken = token;
                        user.save(function (err, user) {
                            var options = {
                                subject: 'You account has been created successfully',
                                link: 'http://localhost:3000/verify/email/' + token + '/' + user._id
                            };
                            MailHelper.sendEmailBySendgrid(user, options, 'verifyEmail');
                            res.status(200).send({
                                success: true,
                                message: 'Your registration has been successfully done.',
                                data: user,
                                token: token
                            });
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
    });
    },
    getProfile: function (req, res) {
        User.findOne({ _id: req.auth.credentials.id }, function (err, user) {

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
    },
    updateProfile: function (req, res) {
        User.findOne({ _id: req.auth.credentials.id }, function (err, user) {
            if (user) {
                user.userName = req.body.userName;
                user.mobile = req.body.mobile ? req.body.mobile : '';
                user.dob = req.body.dob ? req.body.dob : '';
                user.gender = req.body.gender ? req.body.gender : '';
                user.fatherName = req.body.fatherName ? req.body.fatherName : '';
                user.fatherContactNumber = req.body.fatherContactNumber ? req.body.fatherContactNumber : '';
                user.save(function (err, user) {
                    res.status(200).send({
                        success: true,
                        message: 'Your profile has been updated successfully',
                        data: user
                    });
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
    changePassword: function (req, res) {
        var oldPassword = req.body.oldPassword;
        var newPassword = req.body.newPassword;
        var confirmPassword = req.body.confirmPassword;
        if (oldPassword === newPassword) {
            return res.status(400).send({
                success: false,
                message: 'Old and New password are same',
                data: null
            });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).send({
                success: false,
                message: 'New and Confirm password do not match',
                data: null
            });
        }
        User.findOne({ _id: req.auth.credentials.id }, function (err, user) {
            if (user) {
                if (user.password !== CommonHelper.encrypt(oldPassword)) {
                    return res.status(400).send({
                        success: false,
                        message: 'Your old password is incorrect',
                        data: null
                    });
                }
                user.password = CommonHelper.encrypt(newPassword);
                user.save(function (err, user) {
                    return res.status(200).send({
                        success: true,
                        message: 'The password has been updated successfully',
                        data: user
                    });
                });
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'Something went wrong',
                    data: null
                });
            }
        });
    },
    forgetPassword: function (req, res) {
        User.findOne({ email: req.body.email }, function (err, user) {
            if (!user) {
                return res.status(400).send({
                    success: false,
                    message: 'User not found',
                    data: err
                });
            } else {
                var userData = {
                    id: user._id,
                    // userName: user.userName,
                    email: user.email
                };
                var token = Jwt.sign(userData, Config.key.privateKey);
                user.forgotPasswordToken = token;
                console.log(token)
                user.save(function (err, user) {
                var options = {
                    subject: 'Password help has arrived!',
                    url: 'http://localhost:3000/resetpassword/' + token + '/' + user._id
                };
                MailHelper.sendEmailBySendgrid(user, options, 'forgetPasswordEmail');
                return res.status(200).send({
                    success: true,
                    message: "The mail is sent please check your mail !!",
                    data: user
                });
            });
        }
        });
    },

    resetPassword: function (req, res) {
        var newPassword = req.body.newPassword;
        var confirmPassword = req.body.confirmPassword;
        if (newPassword !== confirmPassword) {
            return res.status(400).send({
                success: false,
                message: 'New and Confirm password do not match',
                data: null
            });
        }
        User.findOne({ _id: req.params.userId, forgotPasswordToken: req.params.token }, function (err, user) {
            console.log('hrgh')
            if (user) {
                user.password = CommonHelper.encrypt(newPassword);
                user.forgotPasswordToken = '';
                user.save(function (err, user) {
                    var options = {
                        subject: 'Password reset successfully!',
                    };
                    MailHelper.sendEmailBySendgrid(user, options, 'resetPasswordEmail');
                    return res.status(200).send({
                        success: true,
                        message: 'The password has been reset successfully',
                        data: user
                    });
                });
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'The reset password link has been expired',
                    data: null
                });
            }
        });
    },
    verifyEmail: function (req, res, callback) {
        User.findOne({ verifyEmailToken: req.params.token, _id: req.params.userId }, function (err, user) {
            
            if (!user) {
                callback(false);
            } else {
                user.isEmailVerified = true;
                user.verifyEmailToken = '';
                user.save(function(err, user) {
                    callback(true);
                });
            }
        });
    }
}