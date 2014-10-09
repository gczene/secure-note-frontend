angular.module('app.components.login.ctrl', [])
    .controller('loginCtrl', function ($scope, $state, loginResource) {
        'use strict';

        $scope.errors = {
            email: false,
            password: false
        };

        $scope.submit = function (form) {
            $scope.errors.email = form.email.$invalid;
            $scope.errors.password = form.password.$invalid;
            if (form.$valid) {
                loginResource.login({}, {
                    email: $scope.email,
                    password: $scope.password
                });
            }
        };

    });
