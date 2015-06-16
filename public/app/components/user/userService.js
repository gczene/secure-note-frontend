angular.module('app.components.user.service', [])
    .factory('userService', ['$window', function ($window) {
        'use strict';

        return {
            setSession: function (obj) {
                if (!obj.sessionId) {
                    throw new Error('No sessionId specified!');
                }
                $window.sessionStorage.setItem('user', angular.toJson(obj));
            },
            getSession: function () {
                return angular.fromJson($window.sessionStorage.getItem('user'));
            },
            sessionExists: function () {
                return !!this.getSession();
            },
            removeSession: function () {
                $window.sessionStorage.removeItem('user');
            }
        };
    }]);
