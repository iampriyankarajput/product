/*******************************************************************************
 * Category Controller
 ******************************************************************************/
'use strict';
const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const Config = require('../config/config');
const path = require('path');
const reformatErrors = require('../lib/mongoose-errors');
// const Product = require('../models/Product');
// var Jwt = require('jsonwebtoken');
const CommonHelper = require('../helpers/common')

module.exports = {
    getCategories: function (req, res) {
        Category.find({}, function (err, category) {
            if (!err) {
                res.status(200).send({
                    success: true,
                    message: 'success',
                    data: category
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
    addCategory: function (req, res) {
        var body = req.body;
        console.log(body)
        var category = new Category(body);
        category.save(function (err, category) {
            console.log(body)
            if (!err) {
                // var categoryData = {
                //     id: category._id,
                //     name: req.body.name,
                //     logo: req.body.logo
                // };
                // var token = Jwt.sign(categoryData, Config.key.privateKey);
                res.status(200).send({
                    success: true,
                    message: 'success',
                    data: category
            
                });
            } else {
                res.status(500).send({
                    success: false,
                    message: 'Error in save category',
                    data: err
                });
            }
        })
},

    getCategoryDetail: function (req, res) {
        Category.findOne({_id:req.params.id},function(err,category){ 
        if (!err) {
            res.status(200).send({
                success: true,
                message: 'success',
                data: category
            });
        } else {
            res.status(500).send({
                success: false,
                message: 'Error in save category',
                data: err
            });
        }
    })
},

    updateCategory: function (req, res) {
        Category.findOne({_id: req.params.id }, function (err,category) {
        if (err || !category) {
            return res.status(400).send({
                success: false,
                message: 'category not found',
                data: null
            });
        }

        category.name = req.body.name;
        category.logo = req.body.logo;
        category.save(function (err, category) {
            if(err) {
                res.status(500).send({
                    success: false,
                    message: 'Error in update category',
                    data: err
                });
            } else {
                res.status(200).send({
                    success: true,
                    message: 'Your category has been updated successfully',
                    data: category
                });
            }
        });
    });
},
    deleteCategory: function (req, res) {
        Category.remove({_id: req.params.id }, function (err, category) {
        if (category) {
            res.status(200).send({
                success: true,
                message: 'category deleted successfully',
                data: category
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'No data found',
                data: null
            });
        }
    });
}
}
