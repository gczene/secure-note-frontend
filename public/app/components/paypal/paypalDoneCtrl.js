angular.module('app.components.paypal.done.ctrl', [])
    .controller('paypalDoneCtrl', function (userService, loginService, $state) {
        'use strict';
        var session = userService.getSession();

        if (session && session.sessionId) {
            loginService.refreshSession()
                .then(function (resp) {
                    userService.setSession({sessionId: resp.sessionId, subscribed: resp.subscribed});
                    $state.go('notes');
                });
        }
    });
