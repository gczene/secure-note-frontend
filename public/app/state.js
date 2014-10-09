angular.module('app.state', [])

    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('home', {
                abstract: false,
                authNeeded: true,
                url: "/",
                template: "home"
            });
    });
