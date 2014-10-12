angular.module('app.state', [])

    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('parent', {
                abstract: true,
                views: {
                    navbar: {
                        templateUrl: '/app/components/navbar/views/navbar.html',
                        controller: 'navbarCtrl'
                    }
                }
            })
            .state('home', {
                abstract: false,
                authNeeded: false,
                parent: 'parent',
                url: "/"
            });
    });
