angular.module('app.components.error.service', [])
    .factory('errorService', function (userService, $state) {
        'use strict';

        return {
            handle: function (msg) {
                return function (err) {
                    err.data.msg = err.data.msg || null;
                    if (err.data.msg === 'Session died') {
                        userService.removeSession();
                        $state.go('login');
                    }
                };
            }
        };

    });
