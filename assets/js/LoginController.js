var app = angular.module('LoginApp', []);
app.controller('LoginController', function ($scope, $http, $timeout) {
    $scope.activeRequest = false;
    $scope.loginErrorMsg = '';
    $scope.loginSuccessMsg = '';
    $scope.User = {};
    $scope.login = function (AdminUser) {
        $scope.loginErrorMsg = "";
        $scope.activeRequest = true;
        if (AdminUser.email && AdminUser.password) {
            $http.post('/login', AdminUser).then(function (response) {
                console.log('response', response);
                $scope.loginSuccessMsg = "Login success!";
                localStorage.setItem('userData', JSON.stringify(response.data.data));
                localStorage.setItem('token', response.data.token);
                document.cookie = "session=" + response.data.token;
                $timeout(function () {
                    $scope.loginSuccessMsg = '';
                    window.location = '/platform/#!/platform/';
                }, 2000);

            },
                function (error) {
                    console.log("Error", error);
                    $scope.activeRequest = false;
                    $scope.loginErrorMsg = error.data.message;
                    localStorage.removeItem('userData');
                    localStorage.removeItem('token');
                    $timeout(function () {
                        $scope.loginErrorMsg = '';
                    }, 2000);
                });
        }
    };

    $scope.submitForgetPassword = function (AdminUser) {
    $scope.activeRequest = false;
        $scope.forgetPasswordErrorMsg = '';
        $scope.forgetPasswordSuccessMsg = '';
        if (AdminUser.email) {
            $http.post('/forgetpassword', AdminUser).then(function () {
                $scope.forgetPasswordSuccessMsg = "The email is sent please check your email !!";
                $scope.User = {};
                $scope.activeRequest = false;
                $timeout(function () {
                    $scope.forgetPasswordSuccessMsg = '';
                }, 2000);
            },
                function (error) {
                    console.log("Error", error);
                    $scope.activeRequest = false;
                    $scope.forgetPasswordErrorMsg = error.data.message;
                    $timeout(function () {
                        $scope.forgetPasswordErrorMsg = '';
                    }, 2000);
                });
        };
    };
    // $scope.submitResetPassword = function (AdminUser) {
    //     $scope.activeRequest = false;
    //     $scope.resetPasswordErrorMsg = '';
    //     $scope.resetPasswordSuccessMsg = '';
    //     if (AdminUser.newPassword && AdminUser.confirmPassword ) {
    //         $http.put('/reset/password', AdminUser).then(function () {
    //             $scope.resetPasswordSuccessMsg = 'The password has been reset successfully !!';
    //             $scope.User = {};
    //             $scope.activeRequest = false;
    //             $timeout(function () {
    //                 $scope.resetPasswordSuccessMsg = '';
    //             }, 2000);
    //         },
    //             function (error) {
    //                 console.log("Error", error);
    //                 $scope.activeRequest = false;
    //                 $scope.resetPasswordErrorMsg = error.data.message;
    //                 $timeout(function () {
    //                     $scope.resetPasswordErrorMsg = '';
    //                 }, 2000);
    //             });
    //     };

    // }
});