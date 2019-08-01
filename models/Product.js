/*******************************************************************************
 * Product Model
 ******************************************************************************/
'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamps');

//Define Product schema
var ProductSchema = new Schema({
    name: { type: String, required: true},
    color: {type:String,default:null},
    size: {type:String,default:null},
    price:{type:String,default:null},
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true  }
});

module.exports = mongoose.model('Product', ProductSchema);