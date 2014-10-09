angular.module('app.components.login.ctrl', [])
    .controller('loginCtrl', function ($scope, $state, config) {
        'use strict';

        $scope.errors = {
            email: false,
            password: false
        };

        console.log(config);

        $scope.submit = function (form) {
            $scope.errors.email = form.email.$invalid;
            $scope.errors.password = form.password.$invalid;
        };

    });
