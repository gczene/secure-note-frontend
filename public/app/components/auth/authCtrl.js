angular.module('app.components.auth.ctrl', [])
    .controller('authCtrl', function ($scope, $state, $rootScope, userService) {
        'use strict';

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $state.current = toState;
            if ($state.current.authNeeded && !userService.getSession()) {
                event.preventDefault();
                $state.go('login');
            }
        });

    });
