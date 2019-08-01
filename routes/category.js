/*******************************************************************************
 * Category Routes
 ******************************************************************************/
'use strict';
const express = require('express')
const router = express.Router()
const CategoryController= require('../controllers/CategoryController');
const auth = require('../helpers/auth').validate;

module.exports = function(app) {
    app.get('/api/category',function(req, res) {
        CategoryController.getCategories(req,res);
    });

    app.post('/api/category',function(req, res){
        CategoryController.addCategory(req, res);             // Create a new category
    });

    app.get('/api/category/:id',function(req, res){
        CategoryController.getCategoryDetail(req, res);   
    });

    app.put('/api/category/:id',function(req, res){
        CategoryController.updateCategory(req, res);   
    });

    app.delete('/api/category/:id',function(req, res){
        CategoryController.deleteCategory(req, res);   
    });
}
