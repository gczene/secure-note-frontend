angular.module('app.components.auth.ctrl', [])
    .controller('authCtrl', function ($scope, $state, $rootScope) {
        'use strict';

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $state.current = toState;
        });

    });
