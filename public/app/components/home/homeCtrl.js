angular.module('app.components.home.ctrl', [])
    .controller('homeCtrl', function (
        $scope,
        usSpinnerService,
        noteResource,
        noteService,
        errorService,
        $modal
    ) {
        'use strict';
        // var encrypted = CryptoJS.AES.encrypt("Alma", "Secret Passphrase"),
        //     decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase"),
        //     str,
        var originalList,
            self = this,
            dc = CryptoJS.AES.decrypt,
            obj = {};

        $scope.isCollapsed = true;
        $scope.collapseKey = false;
        $scope.isDetail = false;
        $scope.loader = false;

        $scope.showDetails = function (note) {
            var modalInstance;

            modalInstance = $modal.open({
                templateUrl: '/app/components/home/views/details.html',
                controller: 'detailsCtrl',
                size: 'lg',
                resolve: {
                    note: function () {
                        return note;
                    }
                }
            });

            modalInstance.result.then(function (deletedNote) {
                angular.forEach($scope.notes, function (obj, index) {
                    if (obj === deletedNote) {
                        $scope.notes.splice(index, 1);
                    }
                });
                console.log('deleted', deletedNote);
            }, function () {
                console.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.startSpin = function () {
            usSpinnerService.spin('spinner-1');
        };
        $scope.stopSpin = function () {
            usSpinnerService.stop('spinner-1');
        };

        $scope.key = '';
        $scope.keyAdded = false;
        $scope.setKey = function () {
            if ($scope.key.length >= 5) {
                $scope.keyAdded = true;
                self.decrypt();
                $scope.collapseKey = true;
            }
        };

        $scope.submit = function (form) {
            $scope.formError = form.$invalid;
            if (form.$valid) {
                obj = angular.extend({}, $scope.note);
                $scope.note.label = CryptoJS.AES.encrypt($scope.note.label, $scope.key).toString();
                $scope.note.description = CryptoJS.AES.encrypt($scope.note.description, $scope.key).toString();
                $scope.startSpin();
                noteResource.save($scope.note)
                    .$promise
                    .then(function (resp) {
                        $scope.note = {};
                        $scope.notes.unshift(angular.extend(resp, obj));
                        $scope.stopSpin();
                    });
            }
        };

        noteService.getAll()
            .then(function (resp) {
                $scope.notes = resp.notes;
                originalList = [].concat(resp.notes);

            })
            .catch(errorService.handle());

        this.decrypt = function () {
            $scope.notes = angular.copy(originalList);
            angular.forEach($scope.notes, function (note, index) {
                note.label = dc(note.label, $scope.key)
                        .toString(CryptoJS.enc.Utf8);
                note.description = dc(note.description, $scope.key)
                        .toString(CryptoJS.enc.Utf8);
            });
        };

    })
    .controller('detailsCtrl', function ($scope, $modalInstance, note, noteResource, $window) {
        'use strict';
        $scope.note = note;

        $scope.ok = function () {
            $modalInstance.dismiss('Cancel');
        };

        $scope.delete = function (note) {
            if ($window.confirm('Are you sure?')) {
                noteResource.delete({id: note._id})
                    .$promise
                    .then(function (resp) {
                        $modalInstance.close(note);
                    });
            }
        };

    })
    .filter('nl2br', function ($sce) {
        'use strict';

        return function (msg, is_xhtml) {
            is_xhtml = is_xhtml || true;
            var breakTag = is_xhtml ? '<br />' : '<br>';
            msg = (msg + ' ')
                .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
            return $sce.trustAsHtml(msg);
        };
    });
