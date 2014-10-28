angular.module('Notes', [
    'app.thirdParty',
    'app.config',
    'app.state',
    'ngResource',
    'app.components',
    'templates-main'
]);

angular.module('app.thirdParty', [
    'ui.bootstrap',
    'ui.router',
    'angularSpinner'
]);

angular.module('app.components', [
    'app.components.auth',
    'app.components.error',
    'app.components.home',
    'app.components.login',
    'app.components.navbar',
    'app.components.note',
    'app.components.paypal',
    'app.components.register',
    'app.components.user'
]);
