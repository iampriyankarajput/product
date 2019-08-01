const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.applyLeave = {
    body: {
        year: Joi.any().required(),
        date: Joi.string().required(),
        leaveType: Joi.string().required(),
        reason: Joi.string().required()
    }
};
