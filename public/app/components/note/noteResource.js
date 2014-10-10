angular.module('app.components.note.resource', [])
    .factory('noteResource', function ($resource, config) {
        'use strict';
        return $resource(config.apiUrl + '/notes');
    });
