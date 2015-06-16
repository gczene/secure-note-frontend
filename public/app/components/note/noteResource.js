angular.module('app.components.note.resource', [])
    .factory('noteResource', ['$resource', 'config', function ($resource, config) {
        'use strict';
        return $resource(config.apiUrl + '/notes/:id', null, {
            update: {
                method: 'PUT'
            }
        });
    }]);
