angular.module('app.components.register.state', [])
    .config(['$stateProvider', function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('register', {
                abstract: false,
                authNeeded: false,
                parent: 'parent',
                url: '/register',
                views: {
                    '@': {
                        templateUrl: '/app/components/register/views/register.html',
                        controller: 'registerCtrl'
                    }
                }

            });
    }]);
