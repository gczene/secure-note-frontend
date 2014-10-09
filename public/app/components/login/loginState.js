angular.module('app.components.login.state', [])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('Login', {
                abstract: false,
                authNeeded: true,
                url: "/login",
                views: {
                    '@' : {
                        templateUrl: '/app/components/login/views/login.html',
                        controller: 'loginCtrl'
                    }
                }
            });
    });
