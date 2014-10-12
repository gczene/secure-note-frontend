angular.module('app.components.navbar.ctrl', [])
    .controller('navbarCtrl', function ($state) {
        'use strict';
        console.log($state.current);
    });
