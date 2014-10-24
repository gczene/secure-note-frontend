angular.module('app.components.auth.interceptor', [])
    .config(function ($httpProvider) {
        'use strict';
        $httpProvider.interceptors.push('authInterceptor');
    })
    .factory('authInterceptor', function ($q, userService) {
        'use strict';

        return {
            request: function (request) {
                request.headers = request.headers || {};
                if (userService.sessionExists()) {
                //     if (request.url.indexOf(apiUrl) !== -1) {
                    request.headers.Authorization = userService.getSession().sessionId;
                //     }
                }
                return request || $q.when(request);
            },
            response: function (response) {
                if ((response.status !== undefined) && (typeof response.data === 'object')) {
                    response.data.status = response.status;
                }
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                return $q.reject(rejection);
            }
        };
    });
