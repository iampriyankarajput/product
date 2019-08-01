const Joi = require('joi');
const Config = require('../config/config');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.addContact = {
    body: {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        mobile: Joi.string().required(),
        company: Joi.string().optional().allow(''),
        websiteUrl: Joi.string().optional().allow(''),
        title: Joi.string().required().allow(''),
        message: Joi.string().required().allow(''),
        contactType: Joi.string().optional().allow('').valid('Employee', 'Client', 'Media Inquiry', 'Vendor Enrolment', 'Other'),
        joinFrom: Joi.string().required().valid(Config.platformFrom),
        joinFromType: Joi.string().optional().allow(''), //Home, Contacts, Report, Popup
        acceptedTNC: Joi.boolean().optional().allow().valid(true, false),
        acceptedPNP: Joi.boolean().optional().allow().valid(true, false)
    }
};

module.exports.addWebContact = {
    body: {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        mobile: Joi.string().optional().allow(''),
        category: Joi.string().optional().allow(''),
        language: Joi.string().required(),
        company: Joi.string().optional().allow(''),
        websiteUrl: Joi.string().optional().allow(''),
        title: Joi.string().required().allow(''),
        message: Joi.string().required().allow(''),
        dob: Joi.string().optional().allow(''),
        gender: Joi.string().optional().allow(''),
        budget: Joi.string().optional().allow(''),
        contactType: Joi.string().optional().allow('').valid('Employee', 'Client', 'Media Inquiry', 'Vendor Enrolment', 'Other'),
        joinFrom: Joi.string().required().valid(Config.platformFrom),
        joinFromType: Joi.string().optional().allow(''), //Home, Contacts, Report, Popup
        acceptedNewsLetter: Joi.boolean().optional().allow().valid(true, false),
        acceptedCommercialStuff: Joi.boolean().optional().allow().valid(true, false)
    }
};

module.exports.addCallPlan = {
    body: {
        date: Joi.string().required(),
        time: Joi.string().required(),
        mobile: Joi.string().optional().allow(''),
        clientTimeZone: Joi.string().optional().allow(''),
        duration: Joi.string().optional().allow('')
    }
};

module.exports.moveProspect = {
    body: {
        category: Joi.string().required().valid('prospect', 'lead', 'client')
    }
};
