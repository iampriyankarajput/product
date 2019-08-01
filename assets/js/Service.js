/**
* @author p.baboo@huulke.com
* created on 05.09.2017
*/
(function () {
    'use strict';
    angular.module('WebApp').service('ProductService', ProductService);

    function ProductService($q, $http) {
        return {
            getProducts: function (name, category) {
                var def = $q.defer();
                var url = '/api/product';
                if (name) {
                    url += '?name=' + name;
                }
                if (category) {
                    if (url.indexOf("?") > -1) {
                        url += '&category=' + category;
                    } else {
                        url += '?category=' + category;
                    }
                }
                doGet($q, $http, url).then(function (data) {
                    def.resolve(data);
                }).catch(function (error) {
                    def.reject(error);
                });
                return def.promise;
            },
            getCategories: function () {
                var def = $q.defer();
                var url = '/api/category';
                doGet($q, $http, url).then(function (data) {
                    def.resolve(data);
                }).catch(function (error) {
                    def.reject(error);
                });
                return def.promise;
            },
            getProductDetail: function (id) {
                var def = $q.defer();
                var url = '/api/product/' + id;
                doGet($q, $http, url).then(function (data) {
                    def.resolve(data);
                }).catch(function (error) {
                    def.reject(error);
                });
                return def.promise;
            },
            addProduct: function (opts) {
                var def = $q.defer();
                var url = '/api/product';
                doPost($q, $http, url, opts).then(function (data) {
                    def.resolve(data);
                }).catch(function (error) {
                    def.reject(error);
                });
                return def.promise;
            },
            updateProduct: function (id, opts) {
                var def = $q.defer();
                var url = '/api/product/' + id;
                doPut($q, $http, url, opts).then(function (data) {
                    def.resolve(data);
                }).catch(function (error) {
                    def.reject(error);
                });
                return def.promise;
            },
            deleteProduct: function (id) {
                var def = $q.defer();
                var url = '/api/product/' + id;
                doDelete($q, $http, url).then(function (data) {
                    def.resolve(data);
                }).catch(function (error) {
                    def.reject(error);
                });
                return def.promise;
            },
            addCategory: function (opts) {
                var def = $q.defer();
                var url = '/api/category';
                doPost($q, $http, url, opts).then(function (data) {
                    def.resolve(data);
                }).catch(function (error) {
                    def.reject(error);
                });
                return def.promise;
            },
            getCategoryDetail: function (id) {
                var def = $q.defer();
                var url = '/api/category/' + id;
                doGet($q, $http, url).then(function (data) {
                    def.resolve(data);
                }).catch(function (error) {
                    def.reject(error);
                });
                return def.promise;
            },
            updateCategory: function (id, opts) {
                var def = $q.defer();
                var url = '/api/category/' + id;
                doPut($q, $http, url, opts).then(function (data) {
                    def.resolve(data);
                }).catch(function (error) {
                    def.reject(error);
                });
                return def.promise;
            },
            deleteCategory: function (id) {
                var def = $q.defer();
                var url = '/api/category/' + id;
                doDelete($q, $http, url).then(function (data) {
                    def.resolve(data);
                }).catch(function (error) {
                    def.reject(error);
                });
                return def.promise;
            },
            getProfile: function () {
                var def = $q.defer();
                var url = '/api/user/profile';
                doGet($q, $http, url).then(function (data) {
                    def.resolve(data);
                }).catch(function (error) {
                    def.reject(error);
                });
                return def.promise;
            },
            updateProfile: function (opts) {
                var def = $q.defer();
                var url = '/api/user/profile/';
                doPut($q, $http, url, opts).then(function (data) {
                    def.resolve(data);
                }).catch(function (error) {
                    def.reject(error);
                });
                return def.promise;
            },
            changePassword: function (opts) {
                var def = $q.defer();
                var url = '/api/changepassword/';
                doPut($q, $http, url, opts).then(function (data) {
                    def.resolve(data);
                }).catch(function (error) {
                    def.reject(error);
                });
                return def.promise;
            },
            verifyEmail: function (opts) {
                var def = $q.defer();
                var url = '/api/verify/email/' + token;
                doPut($q, $http, url, opts).then(function (data) {
                    def.resolve(data);
                }).catch(function (error) {
                    def.reject(error);
                });
                return def.promise;
            },
            forgetPassword: function (opts) {
                var def = $q.defer();
                var url = '/api/forgetpassword';
                doPost($q, $http, url, opts).then(function (data) {
                    def.resolve(data);
                }).catch(function (error) {
                    def.reject(error);
                });
                return def.promise;
            },
        };
    }
})();


