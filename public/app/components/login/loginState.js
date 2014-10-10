angular.module('app.components.login.state', [])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('login', {
                abstract: false,
                authNeeded: false,
                url: "/login",
                views: {
                    '@': {
                        templateUrl: '/app/components/login/views/login.html',
                        controller: 'loginCtrl'
                    }
                }
            });
    });
