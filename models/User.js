/*******************************************************************************
 * User Model
 ******************************************************************************/
'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamps');

//Define User schema
var UserSchema = new Schema({
    userName: { type: String, required: true },
    // fullName: { type: String, required: true},
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, trim: true, required: true }, //select: false
    mobile: { type: String, default: null, index: true },
    dob: { type: Date, default: null },
    gender:{ type: String, default: 'male', enum: ['male', 'female'] },
    fatherName: { type: String, default: null },
    fatherContactNumber: { type: String, default: null },
    pencardNumber: { type: String, default: null },
    PFNumber: { type: String, default: null },
    adharcardNumber: { type: String, default: null },
    verifyEmailToken: { type: String, default: null },
    forgotPasswordToken: { type: String, default: null },
    isEmailVerified: { type: Boolean, default: false, enum: [true, false] },
    createdAt: Date,
    updatedAt: Date
});

//middle ware in serial
UserSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    if (this.fullName)
        this.fullName = this.fullName.charAt(0).toUpperCase() + this.fullName.slice(1);
    next();
});

// Add timestamp plugin
//UserSchema.plugin(timestamps, { index: true });

module.exports = mongoose.model('User', UserSchema);
