/*******************************************************************************
 * User Controller
 ******************************************************************************/
'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Config = require('../config/config');
const path = require('path');
const reformatErrors = require('../lib/mongoose-errors');
// const Product = require('../models/Product');
var Jwt = require('jsonwebtoken');
const CommonHelper = require('../helpers/common')

module.exports = {
    getProducts: function (req, res) {
        Product.find({}, function (err, products) {
            if (!err) {
                res.status(200).send({
                    success: true,
                    message: 'success',
                    data: products
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
        console.log(body)
        var product = new Product(body);
        product.save(function (err, product) {
            console.log(body)
            if (!err) {
                var productData = {
                    id: product._id,
                    Name: req.body.Name,
                    Color: req.body.Color
                };
                var token = Jwt.sign(productData, Config.key.privateKey);
                res.status(200).send({
                    success: true,
                    message: 'success',
                    data: product,
                    token:token
            
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

    getProduct: function (req, res) {
        Product.findOne({_id:req.auth.credentials.id},function(err,product){ 
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

    updateProduct: function (req, res) {
    Product.update({_id: req.auth.credentials.id }, function (err, product) {
        if (err || !product) {
            return res.status(400).send({
                success: false,
                message: 'Product not found',
                data: null
            });
        }

        product.Name = req.body.Name;
        product.Color = req.body.Color;
        product.save(function (err, product) {
            if(err) {
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
    Product.remove({_id: req.auth.credentials.id }, function (err, product) {
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
