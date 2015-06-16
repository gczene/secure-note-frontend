angular.module('app.components.register.ctrl', [])
    .controller('registerCtrl', ['$scope', 'registerService', '$state', function ($scope, registerService, $state) {
        'use strict';
        $scope.errors = {
            message: null
        };

        $scope.submit = function (form) {
            $scope.errors = {};
            if (!form.$valid) {
                $scope.errors = registerService.getErrors(form);
            } else {
                registerService.register({
                    email: form.email.$viewValue,
                    password: form.password1.$viewValue
                }).then(function (resp) {
                    $state.go('login');
                }).catch(function (err) {
                    if (err.data.code && err.data.code === 11000) {
                        $scope.errors.message = 'This email is already registered!';
                    } else {
                        $scope.errors.message = 'Sorry, something went wrong. Maybe Network error!';
                    }
                });
            }
        };
    }]);
