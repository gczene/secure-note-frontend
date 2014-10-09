angular.module('app.components.register.resource', [])
    .factory('registerResource', function ($resource, config) {
        'use strict';
        return $resource(config.apiUrl + '/auth/register');
    });
