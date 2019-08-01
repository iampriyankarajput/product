const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.holidayData = {
    body: {
        company: Joi.string().optional().allow(''),
        branch: Joi.string().optional().allow(''),
        description: Joi.string().optional().allow(''),
        holidays: Joi.array().items(Joi.object().keys({date: Joi.string(), title: Joi.string(), type: Joi.string(), description: Joi.string()}))
    }
};
