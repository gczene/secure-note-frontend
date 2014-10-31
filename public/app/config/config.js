angular.module('app.config', ['app.generatedConfig'])
    .factory('config', function (generatedConfig) {
        'use strict';
        return {
            apiUrl: generatedConfig.apiUrl,
            sandbox: false
        };
    });
