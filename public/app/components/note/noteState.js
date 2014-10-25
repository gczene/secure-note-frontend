angular.module('app.components.note.state', [])

    .config(function ($stateProvider) {
        'use strict';
        $stateProvider
            .state('notes', {
                abstract: false,
                authNeeded: true,
                parent: 'parent',
                url: "/notes",
                views: {
                    '@' : {
                        templateUrl: '/app/components/note/views/notes.html',
                        controller: 'noteCtrl'
                    },
                    'paypal@notes': {
                        templateUrl: '/app/components/paypal/views/paypal.html'
                    }
                }
            });
    });
