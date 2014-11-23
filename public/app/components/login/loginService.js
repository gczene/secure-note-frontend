angular.module('app.components.login.service', [])
    .factory('loginService', function (loginResource) {
        'use strict';
        return {
            refreshSession: function () {
                return loginResource.refreshSession({})
                    .$promise;
            }
        };
    });
