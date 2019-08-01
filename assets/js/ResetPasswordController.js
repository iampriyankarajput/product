var app = angular.module('ResetApp', []);
app.controller('ResetPasswordController', function ($scope, $location, $http, $timeout) {
    $scope.activeRequest = false;
    $scope.resetErrorMsg = '';
    $scope.resetSuccessMsg = '';
    $scope.User = {};
    $scope.resetPassword = function (AdminUser) {
        $scope.resetErrorMsg = "";
        $scope.activeRequest = true;
        var urls = $location.absUrl().split('/');
        var token = urls[urls.length-2];
        var userId = urls[urls.length-1];
        $http.put('/resetpassword/'+token+'/'+userId, AdminUser).then(function (response) {
            $scope.resetSuccessMsg = "Your password has been reset succesfully!";
            $timeout(function () {
                $scope.resetSuccessMsg = '';
                window.location = '/login';
            }, 2000);
        },function (error) {
            $scope.activeRequest = false;
            $scope.resetErrorMsg = error.data.message;
            $timeout(function () {
                $scope.resetErrorMsg = '';
            }, 4000);
        });
    };
});
