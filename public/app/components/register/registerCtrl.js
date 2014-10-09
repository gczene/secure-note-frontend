angular.module('app.components.register.ctrl', [])
    .controller('registerCtrl', function ($scope, registerService) {
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
                });
                console.log('ok');
            }

            console.log(form.email.$valid);
        };
    });
