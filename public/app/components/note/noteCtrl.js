angular.module('app.components.note.ctrl', [])
    .controller('noteCtrl', function (
        $scope,
        usSpinnerService,
        noteResource,
        noteService,
        errorService,
        userService,
        $modal
    ) {
        'use strict';
        // var encrypted = CryptoJS.AES.encrypt("Alma", "Secret Passphrase"),
        //     decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase"),
        //     str,
        var originalList,
            self = this,
            dc = CryptoJS.AES.decrypt,
            obj = {},
            hasAccess = function () {
                return ($scope.notes.length < 10) || userService.getSession().subscribed;
            };

        $scope.isCollapsed = true;
        $scope.collapseKey = false;
        $scope.isDetail = false;
        $scope.loader = false;
        $scope.notes = [];
        $scope.sessionId = userService.getSession().sessionId;
        $scope.expireAt = userService.getSession().expireAt;
        $scope.subscribed = userService.getSession().subscribed;

        $scope.showDetails = function (note) {
            var modalInstance;

            modalInstance = $modal.open({
                templateUrl: '/app/components/note/views/details.html',
                controller: 'detailsCtrl',
                size: 'lg',
                resolve: {
                    note: function () {
                        return note;
                    },
                    key: function () {
                        return $scope.key;
                    }
                }
            });

            modalInstance.result.then(function (deletedNote) {
                angular.forEach($scope.notes, function (obj, index) {
                    if (obj === deletedNote) {
                        $scope.notes.splice(index, 1);
                    }
                });
            }, function (reason) {
                if (reason.reason === 'update') {
                    console.log(reason.note);
                }
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
            $scope.formError = form.$invalid || !$scope.hasAccess;
            if (form.$valid && $scope.hasAccess) {
                obj = angular.extend({}, $scope.note);
                $scope.note.label = CryptoJS.AES.encrypt($scope.note.label, $scope.key).toString();
                $scope.note.description = CryptoJS.AES.encrypt($scope.note.description, $scope.key).toString();
                $scope.startSpin();
                noteResource.save($scope.note)
                    .$promise
                    .then(function (resp) {
                        $scope.note = {};
                        $scope.notes.unshift(angular.extend(resp, obj));
                        $scope.hasAccess = hasAccess();
                        $scope.stopSpin();
                    });
            }
        };

        noteService.getAll()
            .then(function (resp) {
                $scope.notes = resp.notes;
                originalList = [].concat(resp.notes);
                $scope.hasAccess = hasAccess();
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
    .controller('detailsCtrl', function ($scope, $modalInstance, note, noteResource, $window, key) {
        'use strict';
        $scope.note = note;
        $scope.editing = false;

        $scope.ok = function () {
            $modalInstance.dismiss({reason: 'Cancel', note: $scope.note});
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

        $scope.update = function () {
            noteResource.update({id: $scope.note._id}, {
                label: CryptoJS.AES.encrypt($scope.note.label, key).toString(),
                description: CryptoJS.AES.encrypt($scope.note.description, key).toString()
            });
            $modalInstance.dismiss({reason: 'update', note: $scope.note});
        };

        $scope.edit = function () {
            $scope.editing = true;
        };

        $scope.cancelEdit = function () {
            $scope.editing = false;
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
