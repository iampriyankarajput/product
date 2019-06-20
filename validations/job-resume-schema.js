const Joi = require('joi');
const Config = require('../config/config');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.applyJob = {
    body: {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        mobile: Joi.string().required(),
        message: Joi.string().required(),
        language: Joi.string().required(),
        appliedFor: Joi.objectId().required(),
        resume: Joi.object().required()
    }
};

module.exports.createJob = {
    body: {
        title: Joi.string().required(),
        openings: Joi.number().required(),
        experience: Joi.string().required(),
        location: Joi.string().optional(),
        desciption: Joi.string().optional(),
        language: Joi.string().required()
    }
};

module.exports.updateJob = {
    body: {
        title: Joi.string().required(),
        openings: Joi.number().required(),
        experience: Joi.string().required(),
        location: Joi.string().optional(),
        desciption: Joi.string().optional(),
        language: Joi.string().required(),
        status: Joi.boolean().required().valid(0, 1)
    }
};
