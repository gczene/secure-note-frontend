angular.module('app.components.login.resource', [])
    .factory('loginResource', function ($resource, config) {
        'use strict';

        return $resource(config.apiUrl + '/auth', {}, {
            login: {
                method: 'POST'
            },
            refreshSession: {
                method: 'GET'
            }
        });

    });
