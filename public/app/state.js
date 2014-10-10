angular.module('app.state', [])

    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('home', {
                abstract: false,
                authNeeded: true,
                url: "/",
                views: {
                    '@' : {
                        templateUrl: '/app/components/home/views/home.html',
                        controller: 'homeCtrl'
                    }
                }
            });
    });
