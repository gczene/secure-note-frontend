// Karma configuration
// Generated on Mon Jun 02 2014 15:17:08 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'public/vendor/angular/angular.js',
        'public/vendor/angular-mocks/angular-mocks.js',
        'public/vendor/angular-resource/angular-resource.js',
        'public/vendor/angular-ui-router/release/angular-ui-router.js',
        'public/vendor/angular-bootstrap/ui-bootstrap.js',
        'public/vendor/spin.js/spin.js',
        'public/app/**/*.js',
        'test/mocks/**/*.js',
        'test/helpers.js',
        'test/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [

    ],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
        'Chrome'
        //'PhantomJS'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
