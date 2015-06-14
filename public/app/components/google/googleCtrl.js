angular.module('app.components.google.ctrl', [])
    .controller('googleCtrl', [
        '$scope',
        'GooglePlus',
        'userService',
        'loginResource',
        '$state',
        function (
            $scope,
            GooglePlus,
            userService,
            loginResource,
            $state
        ) {
            'use strict';

            $scope.googleLogin = function () {
                GooglePlus.login().then(function (authResult) {
                    return loginResource
                        .googleLogin({}, {accessToken: authResult.access_token})
                        .$promise;

                })
                    .then(function (resp) {
                        userService.setSession({
                            sessionId: resp.sessionId,
                            subscribed: resp.subscribed,
                            expireAt: resp.expireAt
                        });
                        $scope.isLoggedIn = userService.sessionExists();
                        $state.go('notes');
                    })
                    .catch(function (err) {
                        if (err.status === 401) {
                            $scope.errors.message = err.data.msg;
                        } else {
                            $scope.errors.message = 'Something went wrong!';
                        }
                    });
            };

        }]);
