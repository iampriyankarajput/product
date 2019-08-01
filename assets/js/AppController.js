// import { stringToSign } from "knox/lib/auth";

var app = angular.module('WebApp', ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/platform/', {
            templateUrl: '/views/product/list.html',
            controller: 'ProductController'
        }).
        when("/platform/add", {
            templateUrl: '/views/product/add.html',
            controller: 'ProductAddController'
        }).
        when("/platform/edit/:id", {
            templateUrl: '/views/product/update.html',
            controller: 'ProductUpdateController'
        }).

        when('/platform/category', {
            templateUrl: '/views/product/categorylist.html',
            controller: 'CategoryController'
        }).
        when("/platform/categoryadd", {
            templateUrl: '/views/product/categoryadd.html',
            controller: 'CategoryAddController'
        }).
        when("/platform/update/:id", {
            templateUrl: '/views/product/categoryupdate.html',
            controller: 'CategoryUpdateController'
        }).
        when("/platform/profile", {
            templateUrl: '/views/user/profile.html',
            controller: 'ProfileController'
        }).
        when("/platform/change/password", {
            templateUrl: '/views/user/changepassword.html',
            controller: 'ChangePasswordController'
        })
}]);

app.controller('AppController', function ($scope) {
    console.log("Home controller");
    $scope.logout = function () {
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        document.cookie = "session=''";
        window.location = '/';
    };
});
app.controller('ProductController', function ($scope, ProductService,$window) {
    $scope.name = '';
    $scope.category = '';
    ProductService.getCategories().then(function (data) {
        $scope.categories = data.data.data;
    });

    $scope.getList = function (name, category) {
        ProductService.getProducts(name, category).then(function (data) {
            $scope.products = data.data.data;
        });
    };

    $scope.getList($scope.name, $scope.category);
    $scope.search = function (name) {
        $scope.getList(name, $scope.category);
    };

    $scope.searchCategory = function (cat) {
        $scope.getList($scope.name, cat);
    };

    $scope.deleteProduct = function (id) {
        ProductService.deleteProduct(id).then(function (data) {
            $scope.deleteProduct = function (id) {
                if ($window.confirm("Please confirm?")) {
                    $scope.Message = "You clicked YES.";
                } else {
                    $scope.Message = "You clicked NO.";
                }
            }
            $scope.products = data.data.data;
            $scope.getList();
        });
    };
});
app.controller('ProductAddController', function ($scope,  $location,$timeout, ProductService) {
    ProductService.getCategories().then(function (data) {
        $scope.categories = data.data.data;
    });
    $scope.successMessage = '';
    $scope.errorMessage = '';
    $scope.requestSent = false;
    $scope.addProduct = function () {
        if($scope.Product.name&&$scope.Product.color&&$scope.Product.size&&$scope.Product.price&&$scope.Product.category) {
            $scope.successMessage = '';
            $scope.errorMessage = '';
            $scope.requestSent = true;
        var opts = {
            name: $scope.Product.name,
            color: $scope.Product.color,
            size: $scope.Product.size,
            price: $scope.Product.price,
            category: $scope.Product.category
        };
        ProductService.addProduct(opts).then(function (data) {
            $scope.successMessage = 'Product has been added successfully';
            $scope.requestSent = false;
            $timeout(function () {
                $scope.requestSent = true;
                $scope.successMessage = '';
                $location.path('/platform');
            }, 4000);
        });
        } else {
            $scope.requestSent = false;
            $scope.errorMessage = 'Please fill all the details';
            $timeout(function () {
                $scope.errorMessage = '';
            }, 4000); 
          
        }
    };

});

app.controller('ProductUpdateController', function ($scope, $routeParams, $location, ProductService, $timeout) {
    var id = $routeParams.id;
    $scope.Product = {};
    ProductService.getProductDetail(id).then(function (data) {
        $scope.Product = data.data.data;
    });
    $scope.successMessage = '';
    $scope.errorMessage = '';
    $scope.requestSent = false;
    $scope.updateProduct = function () {
        if($scope.Product.name&&$scope.Product.color&&$scope.Product.size&&$scope.Product.price) {
            $scope.successMessage = '';
            $scope.errorMessage = '';
            $scope.requestSent = true;
        var opts = {
            name: $scope.Product.name,
            color: $scope.Product.color,
            size: $scope.Product.size,
            price: $scope.Product.price
        };
        ProductService.updateProduct(id, opts).then(function (data) {
            $scope.successMessage = 'Product has been updated successfully';
            $scope.requestSent = false;
            $timeout(function () {
                $scope.requestSent = true;
                $scope.successMessage = '';
                $location.path('/platform');
            }, 4000);
        });
        } else {
            $scope.requestSent = false;
            $scope.errorMessage = 'All details are required';
            $timeout(function () {
                $scope.errorMessage = '';
            }, 4000); 
          
        }
    };
});

app.controller('CategoryController', function ($scope, ProductService) {
    $scope.getList = function () {
        ProductService.getCategories().then(function (data) {
            $scope.category = data.data.data;
        });
    };
    $scope.getList();
    $scope.deleteCategory = function (id) {
        ProductService.deleteCategory(id).then(function (data) {
            $scope.category = data.data.data;
            $scope.getList(); 
        });
    };
});
app.controller('CategoryAddController', function ($scope,   $timeout, $location, ProductService) {
    $scope.successMessage = '';
    $scope.errorMessage = '';
    $scope.requestSent = false;
    $scope.addCategory = function () {
        if($scope.name) {
            $scope.successMessage = '';
            $scope.errorMessage = '';
            $scope.requestSent = true;
        var opts = {
            name: $scope.name,
        };
        ProductService.addCategory(opts).then(function (data) {
            $scope.successMessage = 'Category has been added successfully';
                $scope.requestSent = false;
                $timeout(function () {
                    $scope.requestSent = true;
                    $scope.successMessage = '';
                    $location.path('/platform/category');
                }, 4000);
            });
        } else {
            $scope.requestSent = false;
            $scope.errorMessage = 'Category name is required';
            $timeout(function () {
                $scope.errorMessage = '';
            }, 4000);
        }
    };

});
app.controller('CategoryUpdateController', function ($scope, $routeParams, $timeout, $location, ProductService) {
    var id = $routeParams.id;
    $scope.Category = {};
    ProductService.getCategoryDetail(id).then(function (data) {
        $scope.Category = data.data.data;
    });

    $scope.successMessage = '';
    $scope.errorMessage = '';
    $scope.requestSent = false;
    $scope.updateCategory = function () {
        if($scope.Category.name) {
            $scope.successMessage = '';
            $scope.errorMessage = '';
            $scope.requestSent = true;
            var opts = {
                name: $scope.Category.name,
            };
            ProductService.updateCategory(id, opts).then(function (data) {
                $scope.successMessage = 'Category has been updated successfully';
                $scope.requestSent = false;
                $timeout(function () {
                    $scope.requestSent = true;
                    $scope.successMessage = '';
                    $location.path('/platform/category');
                }, 4000);
            });
        } else {
            $scope.requestSent = false;
            $scope.errorMessage = 'Category name is required';
            $timeout(function () {
                $scope.errorMessage = '';
            }, 4000);
        }
        
    };
});
app.controller('ProfileController', function ($scope, $location,  ProductService, $timeout) {
    ProductService.getProfile().then(function (data) {
        $scope.User = data.data.data;
        if($scope.User.dob) {
            $scope.User.dob = new Date($scope.User.dob);
        }
    }).catch(function (error) {
        $scope.User = {};
    });
    $scope.successMessage = '';
    $scope.errorMessage = '';
    $scope.requestSent = false;
    $scope.updateProfile = function () {
        if($scope.User.userName&&$scope.User.mobile&&$scope.User.dob&&$scope.User.gender) {
            $scope.successMessage = '';
            $scope.errorMessage = '';
            $scope.requestSent = true;
        var opts = {
            userName: $scope.User.userName,
            mobile: $scope.User.mobile,
            dob: $scope.User.dob,
            gender: $scope.User.gender,
            fatherName: $scope.User.fatherName,
            fatherContactNumber: $scope.User.fatherContactNumber
        };
        ProductService.updateProfile(opts).then(function (data) {
            $scope.successMessage = 'Your profile has been updated successfully';
            $scope.requestSent = false;
            $timeout(function () {
                $scope.requestSent = true;
                $scope.successMessage = '';
                $location.path('/platform/profile');
            }, 4000);
        });
    } else {
        $scope.requestSent = false;
        $scope.errorMessage = 'Please fill the details';
        $timeout(function () {
            $scope.errorMessage = '';
        }, 4000);
    }
    }
});
app.controller('ChangePasswordController', function ($scope, $location, ProductService, $timeout) {
    $scope.changePassword = function () {
        var opts = {
            oldPassword: $scope.password.oldPassword,
            newPassword: $scope.password.newPassword,
            confirmPassword: $scope.password.confirmPassword
        };
        ProductService.changePassword(opts).then(function (data) {
            $scope.changePasswordSuccessMsg = data.data.message;
            $scope.password = data.data.data;
            $timeout(function () {
                $scope.changePasswordSuccessMsg = '';
                $location.path('/platform/');
            }, 4000);
        });

    }
});

app.controller('VerifyEmailController', function ($scope, $window, $location, ProductService) {
    ProductService.verifyEmail().then(function (data) {
    });
});

app.controller('ForgetPasswordController', function ( ProductService) {
    ProductService.forgetPassword().then(function (data) {
    });
});


