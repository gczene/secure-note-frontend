angular.module('app.components.auth.ctrl', [])
    .controller('authCtrl', function ($scope, $state, $rootScope, userService, $http, config) {
        'use strict';

        $http.get(config.apiUrl);

        $scope.isLoggedIn = userService.sessionExists();

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $state.current = toState;
            if ($state.current.authNeeded && !userService.getSession()) {
                event.preventDefault();
                $state.go('login');
            }
        });

        $scope.myEmail = 'gabo';

        $scope.$watch(function () {
            return userService.sessionExists();
        }, function (newValue, oldValue) {
            $scope.isLoggedIn = newValue;
        });

        $scope.logout = function () {
            userService.removeSession();
            $state.go('home');
        };

        $scope.myEmail = $scope.myEmail + 'r@';
        $scope.myEmail = $scope.myEmail + 'czene.co.uk';
    });
