angular.module('app.config', ['app.generatedConfig'])
    .factory('config', ['generatedConfig', function (generatedConfig) {
        'use strict';
        return {
            apiUrl: generatedConfig.apiUrl,
            sandbox: false
        };
    }])
    .config(['GooglePlusProvider', function (GooglePlusProvider) {
        'use strict';
        GooglePlusProvider.init({
            clientId: '247186165719-m3hjfotbaq7obghetqqps96t36hk21ib.apps.googleusercontent.com',
            apiKey: 'AT8mIqmCgBmANI0L5Lbu3e5s'
        });
    }]);
