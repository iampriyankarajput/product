/*******************************************************************************
 * Product Routes
 ******************************************************************************/
'use strict';
const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController');
const auth = require('../helpers/auth').validate;

module.exports = function(app) {
    app.get('/product', auth,function(req, res) {
        ProductController.getProducts(req, res);
    });

    app.post('/product',function(req, res){
        ProductController.addProduct(req, res);             // Create a new Product
    });

    app.get('/product',auth,function(req, res){
        ProductController.getProduct(req, res);   
    });

    app.put('/updateproduct',auth,function(req, res){
        ProductController.updateProduct(req, res);   
    });

    app.delete('/deleteproduct',auth,function(req, res){
        ProductController.deleteProduct(req, res);   
    });
}
