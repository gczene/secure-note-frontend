angular.module('Notes', [
    'app.thirdParty',
    'app.config',
    'app.state',
    'ngResource',
    'app.components'
]);

angular.module('app.thirdParty', [
    'ui.bootstrap',
    'ui.router'
]);

angular.module('app.components', [
    'app.components.auth',
    'app.components.login',
    'app.components.register'
]);
