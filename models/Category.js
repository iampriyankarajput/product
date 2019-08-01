/*******************************************************************************
 * Categories Model
 ******************************************************************************/
'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamps');

//Define Categories schema
var CategoriesSchema = new Schema({
    name: { type: String, required: true },
    descriptioon: { type: String, default: null }
});


module.exports = mongoose.model('Category', CategoriesSchema);