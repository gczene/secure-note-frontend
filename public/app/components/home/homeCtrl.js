angular.module('app.components.home.ctrl', [])
    .controller('homeCtrl', function (
        $scope,
        $modal
    ) {
        'use strict';
        console.log('home ctrl');
    })
    .controller('tryItCtrl', function ($scope, $state, $location, $rootScope) {
        'use strict';


        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $state.current = toState;
            $scope.isHome = $state.current.name === 'home';

        });

        $scope.tryIt = {
            key: '',
            text: ''
        };

        $scope.decrypt = function () {
            if ($scope.tryIt.text) {
                $scope.output = CryptoJS.AES.encrypt($scope.tryIt.text, $scope.tryIt.key).toString();
            } else {
                $scope.output = '';
            }
        };

    });
