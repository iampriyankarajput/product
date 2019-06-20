const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.login = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
});

module.exports.createAccount = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(50),
    confirmpassword: Joi.string().required().min(6).max(50),
    mobile: Joi.string().required(),
    telephone: Joi.string().optional().allow(''),
    panNumber: Joi.string().optional().allow(''),
    tinNumber: Joi.string().optional().allow(''),
    address: Joi.string().optional().allow(''),
    city: Joi.string().optional().allow(''),
    state: Joi.string().optional().allow(''),
    country: Joi.string().optional().allow(''),
    zip: Joi.string().optional().min(5).max(6).allow('')
});

module.exports.updateAccount = Joi.object().keys({
    websiteUrl: Joi.string().required(),
    mobile: Joi.string().required(),
    telephone: Joi.string().optional().allow(''),
    panNumber: Joi.string().optional().allow(''),
    tinNumber: Joi.string().optional().allow(''),
    address: Joi.string().optional().allow(''),
    city: Joi.string().optional().allow(''),
    state: Joi.string().optional().allow(''),
    country: Joi.string().optional().allow(''),
    zip: Joi.string().optional().min(5).max(6).allow(''),
    picture: Joi.object().optional().allow(''),
    pictureBounds: Joi.object().optional().allow('')
});


module.exports.verifyAccountEmail = Joi.object().keys({
    accountId: Joi.objectId().required(),
    email: Joi.string().required(),
    token: Joi.string().required()
});

module.exports.changePasswordSchema = Joi.object({
    oldPassword: Joi.string().required().regex(/^[a-zA-Z0-9?=.*!@#$%^&*_\-\s]{3,30}$/).error(new Error('Old Password is required with characters range 6 to 20')),
    newPassword: Joi.string().required().regex(/^[a-zA-Z0-9?=.*!@#$%^&*_\-\s]{3,30}$/).error(new Error('New Password is required with characters range 6 to 20')),
    confirmPassword: Joi.string().required().regex(/^[a-zA-Z0-9?=.*!@#$%^&*_\-\s]{3,30}$/).error(new Error('Confirm Password is required with characters range 6 to 20'))
}).options({abortEarly: false});

module.exports.forgotPassword = Joi.object().keys({
    email: Joi.string().required()
});

module.exports.resetPassword = Joi.object({
    accountId: Joi.objectId().required(),
    email: Joi.string().required(),
    token: Joi.string().required(),
    newPassword: Joi.string().required().regex(/^[a-zA-Z0-9?=.*!@#$%^&*_\-\s]{3,30}$/),
    confirmPassword: Joi.string().required().regex(/^[a-zA-Z0-9?=.*!@#$%^&*_\-\s]{3,30}$/)
}).options({abortEarly: false});
