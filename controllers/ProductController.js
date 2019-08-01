/*******************************************************************************
 * User Controller
 ******************************************************************************/
'use strict';
const mongoose = require('mongoose');
// const Product = mongoose.model('Category');
const Config = require('../config/config');
const path = require('path');
const reformatErrors = require('../lib/mongoose-errors');
const Product = require('../models/Product');
// var Jwt = require('jsonwebtoken');
const CommonHelper = require('../helpers/common')

module.exports = {
    getProducts: function (req, res) {
        var query = {};
        if (req.query.name) {
            var name = req.query.name;
            query.name = { $regex: new RegExp("^" + name.toLowerCase(), "i") };
        }
        if (req.query.category) {
            var category = req.query.category;
            query.category = category;
        }
        Product.find(query).populate('category').exec(function (err, product) {
            if (!err) {
                res.status(200).send({
                    success: true,
                    message: 'success',
                    data: product
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
    addProduct: function (req, res) {
        var body = req.body;
        var product = new Product(body);
        product.save(function (err, product) {
            if (!err) {
                res.status(200).send({
                    success: true,
                    message: 'success',
                    data: product

                });
            } else {
                res.status(500).send({
                    success: false,
                    message: 'Error in save product',
                    data: err
                });
            }
        })
    },

    getProductDetail: function (req, res) {
        Product.findOne({ _id: req.params.id }, function (err, product) {
            if (!err) {
                res.status(200).send({
                    success: true,
                    message: 'success',
                    data: product
                });
            } else {
                res.status(500).send({
                    success: false,
                    message: 'Error in save product',
                    data: err
                });
            }
        });
    },

    updateProduct: function (req, res) {
        Product.findOne({ _id: req.params.id }, function (err, product) {
            if (err || !product) {
                return res.status(400).send({
                    success: false,
                    message: 'Product not found',
                    data: null
                });
            }

            product.name = req.body.name;
            product.color = req.body.color;
            product.size = req.body.size;
            product.price = req.body.price;
            product.save(function (err, product) {
                if (err) {
                    res.status(500).send({
                        success: false,
                        message: 'Error in update product',
                        data: err
                    });
                } else {
                    res.status(200).send({
                        success: true,
                        message: 'Your product has been updated successfully',
                        data: product
                    });
                }
            });
        });
    },
    deleteProduct: function (req, res) {
        Product.remove({ _id: req.params.id }, function (err, product) {
            if (product) {
                res.status(200).send({
                    success: true,
                    message: 'Product deleted successfully',
                    data: product
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
