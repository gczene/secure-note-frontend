angular.module('app.components.login.ctrl', [])
    .controller('loginCtrl', function (
        $scope,
        $state,
        loginResource,
        userService,
        GooglePlus
    ) {
        'use strict';

        if (userService.getSession()) {
            return $state.go('home');
        }


        $scope.errors = {
            email: false,
            password: false
        };

        $scope.submit = function (form) {
            $scope.errors.email = form.email.$invalid;
            $scope.errors.password = form.password.$invalid;
            if (form.$valid) {
                $scope.errors.message = '';
                loginResource.login({}, {
                    email: $scope.email,
                    password: $scope.password
                })
                    .$promise
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
            }
        };

        $scope.googleLogin = function () {
            GooglePlus.login().then(function (authResult) {

                console.log('authResult', authResult);
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

    });
