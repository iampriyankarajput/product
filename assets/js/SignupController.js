var app = angular.module('SignApp', []);

app.controller('SignupController', function ($scope, $http, $timeout) {
    $scope.activeRequest = false;
    $scope.signErrorMsg = '';
    $scope.signSuccessMsg = ''; 
    $scope.User = {};
    $scope.sign = function(AdminUser) {
        $scope.signErrorMsg = "";
        $scope.activeRequest = true;
        $http.post('/sign', AdminUser).then(function (response) {
            $scope.signSuccessMsg = "Signup successfully done Please login!";
            $timeout(function () {
                $scope.signSuccessMsg = '';
                window.location = '/login/';
            }, 4000);
        },
         function (error) {
            console.log("Error", error);
            $scope.activeRequest = false;
            $scope.signErrorMsg = error.data.message;
            $timeout(function () {
                $scope.signErrorMsg = '';
            }, 4000);
        });
    };
});