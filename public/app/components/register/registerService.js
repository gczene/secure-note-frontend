angular.module('app.components.register.service', [])
    .factory('registerService', function (registerResource) {
        'use strict';
        var errors = {};

        return {
            getErrors: function (form) {
                errors = {};
                if (!form.email.$valid) {
                    errors.email = true;
                    errors.message = 'E-mail is not valid!';
                } else if (!form.password1.$valid) {
                    errors.password1 = true;
                    errors.message = 'Password is not ok! Min 5 chars!';
                } else if (form.password1.$viewValue !== form.password2.$viewValue) {
                    errors.password2 = true;
                    errors.message = 'The given passwords do not match!';
                }
                return errors;
            },
            register: function (credentials) {
                if (!angular.isObject(credentials)) {
                    throw new Error('Bad credentials');
                }
                if (!credentials.email || !credentials.password) {
                    throw new Error('Missing email or password');
                }

                return registerResource.save({}, credentials)
                    .$promise;
            }
        };
    });
