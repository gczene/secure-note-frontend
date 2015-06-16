angular.module('app.components.register.resource', [])
    .factory('registerResource', ['$resource', 'config', function ($resource, config) {
        'use strict';
        return $resource(config.apiUrl + '/auth/register');
    }]);
