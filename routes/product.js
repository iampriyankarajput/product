/*******************************************************************************
 * Product Routes
 ******************************************************************************/
'use strict';
const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController');
const auth = require('../helpers/auth').validate;

module.exports = function(app) {
    app.get('/api/product', auth, function(req, res) {
        ProductController.getProducts(req, res);
    });

    app.post('/api/product', auth, function(req, res) {
        ProductController.addProduct(req, res);
    });

    app.get('/api/product/:id', auth, function(req, res) {
        ProductController.getProductDetail(req, res);   
    });

    app.put('/api/product/:id', auth, function(req, res) {
        ProductController.updateProduct(req, res);   
    });

    app.delete('/api/product/:id', auth, function(req, res) {
        ProductController.deleteProduct(req, res);   
    });
}
