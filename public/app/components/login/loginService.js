angular.module('app.components.login.service', [])
    .factory('loginService', function (loginResource) {
        'use strict';
        return {
            refreshSession: function () {
                console.log('refreshing session');
                return loginResource.refreshSession({})
                    .$promise;
            }
        };
    });
