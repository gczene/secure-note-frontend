angular.module('app.components.note.service', [])
    .factory('noteService', ['noteResource', function (noteResource) {
        'use strict';
        return {
            getAll: function () {
                return noteResource.get()
                    .$promise;
            }
        };
    }]);
