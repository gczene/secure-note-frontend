angular.module('app.components.register.state', [])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('register', {
                abstract: false,
                authNeeded: false,
                url: '/register',
                views: {
                    '@': {
                        templateUrl: '/app/components/register/views/register.html',
                        controller: 'registerCtrl'
                    }
                }

            });
    });
