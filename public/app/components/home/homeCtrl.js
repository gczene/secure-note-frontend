angular.module('app.components.home.ctrl', [])
    .controller('homeCtrl', function ($scope, usSpinnerService, noteResource, noteService, errorService) {
        'use strict';
        // var encrypted = CryptoJS.AES.encrypt("Alma", "Secret Passphrase"),
        //     decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase"),
        //     str,
        var originalList,
            self = this,
            dc = CryptoJS.AES.decrypt,
            obj = {};

        $scope.isCollapsed = true;
        // console.log(encrypted.toString());
        // console.log(decrypted.toString(CryptoJS.enc.Utf8));

        // str = 'U2FsdGVkX1//M2QeBj1dz9AOCWNbHTBTGgNQGtcMlJA=';

        // console.log(CryptoJS.AES.decrypt(str, "Secret Passphrase")
        //     .toString(CryptoJS.enc.Utf8));

        $scope.loader = false;

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
            $scope.notes = [].concat(originalList);
            angular.forEach($scope.notes, function (note, index) {
                note.label = dc(note.label, $scope.key)
                        .toString(CryptoJS.enc.Utf8);
                note.description = dc(note.description, $scope.key)
                        .toString(CryptoJS.enc.Utf8);
            });
        };

    });
