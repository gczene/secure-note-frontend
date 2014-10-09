angular.module('Notes', [
    'app.thirdParty',
    'app.state',
    'app.components'
]);

angular.module('app.thirdParty', [
    'ui.bootstrap',
    'ui.router'
]);

angular.module('app.components', [
    'app.components.login',
    'app.components.auth'
]);
