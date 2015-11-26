describe('googleCtrl', function () {
    var controller,
        $scope,
        $q,
        $browser,
        GooglePlus;

    beforeEach(function () {
        module(
            'app.components.google.ctrl',
            function ($provide) {
                $provide.value('GooglePlus', {
                    login: function () {
                        return $q.when({access_token: 'abc123'});
                    }
                });
            }
        );

        inject(function ($controller, _$rootScope_, _$q_, _$browser_, _GooglePlus_) {
            GooglePlus = _GooglePlus_;
            $scope = _$rootScope_.$new();
            $q = _$q_;
            $browser = _$browser_;

            spyOn(GooglePlus, 'login').andCallThrough();

            controller = $controller('googleCtrl', {
                $scope: $scope
            });
        });
    });

    it('should be defined', function () {
        expect(controller).toBeDefined();
    });

    it('should have $scope.googleLogin() method', function () {
        expect($scope.googleLogin).toBeDefined();
    });

    it('$scope.googleLogin() should call GooglePlus.login', function () {
        $scope.googleLogin();
        expect(GooglePlus.login).toHaveBeenCalled();
    });
});
