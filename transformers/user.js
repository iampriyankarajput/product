'use strict';
const Config = require('../config/config');
module.exports = function (user) {
    return {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
        adminType: user.adminType,
        mobile: user.mobile,
        gender: user.gender,
        dob: user.dob,
        address: user.address,
        city: user.city,
        state: user.state,
        country: user.country,
        zip: user.zip,
        lat: user.lat,
        lng: user.lng,
        picture: user.picture,
        modules: user.modulesAndpermissions,
        updated_at: user.updated_at,
        created_at: user.created_at
    };
};
