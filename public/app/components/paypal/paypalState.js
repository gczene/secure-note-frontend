angular.module('app.components.paypal.state', [])
    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('paypalDone', {
                abstract: false,
                authNeeded: false,
                parent: 'parent',
                url: '/paypal/done',
                views: {
                    '@': {
                        controller: 'paypalDoneCtrl'
                    }
                }

            });
    });
