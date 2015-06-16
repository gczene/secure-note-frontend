angular.module('app.components.login.resource', [])
    .factory('loginResource', ['$resource', 'config', function ($resource, config) {
        'use strict';

        return $resource(config.apiUrl + '/auth', {}, {
            login: {
                method: 'POST'
            },
            googleLogin: {
                url: config.apiUrl + '/auth/google',
                method: 'POST'
            },
            refreshSession: {
                method: 'GET'
            }
        });

    }]);
