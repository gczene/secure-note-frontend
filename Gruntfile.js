module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dev: {
        options: {
          // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
          sourceMap: true,
          mangle: false,
          beautify: true
        },
        files: {
          'public/dist/secure.notes.min.js': ['./public/app/**/*.js']
        }
      },
      production: {
        options: {
          // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
          sourceMap: false,
          mangle: true,
          beautify: false
        },
        files: {
          'public/dist/secure.notes.min.js': ['./public/app/**/*.js']
        }

        // options: {
        //   // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        //   sourceMap: false,
        //   mangle: true,
        //   beautify: false
        // },
        // files: {
        //   // 'public/dist/secure.notes.min.js': ['./public/dist/annotate.js']
        //   'public/dist/secure.notes.min.js': ['./public/app/**/*.js']
        // }
      }
    },
    html2js: {
        options: {
            base: 'public/',
            useStrict: true,
            rename: function (name) {
                return '/' + name;
            },
            htmlmin: {
                collapseWhitespace: true,
                removeComments: true
            }
        },
        main: {
            src: ['public/app/**/*.html'],
            dest: 'public/app/templates.js'
        }
    },
    watch: {
      options: {
        livereload: true
      },
      files: ['./public/app/**/*.html', './public/app/**/*.js', './public/index-template.html'],
      tasks: ['html2js', 'replace:dev', 'jslint', 'uglify:dev']
    },
    jslint: {
      all: {
        src: ['./public/app/**/*.js'],
        directives: {
          globals: ['angular', 'console', 'CryptoJS'],
          unparam: true,
          nomen: true,
          regexp: true
        },
        options: {
          errorsOnly: true,
          failOnError: false
        },
        exclude: [
            './public/app/templates.js'
        ]
      }
    },
    replace: {
      dev: {
        options: {
          patterns: [
            {
              match: 'bootstrap-ui',
              replacement: './vendor/angular-bootstrap/ui-bootstrap-tpls.min.js'
            },
            {
              match: 'apiUrl',
              replacement: 'http://localhost:3000'
            },
            {
              match: 'bootstrapCss',
              replacement: './vendor/bootstrap/dist/css/bootstrap.min.css'
            },
            {
              match: 'angularJs',
              replacement: './vendor/angular/angular.min.js'
            },
            {
              match: 'angular-UI-Js',
              replacement: './vendor/angular-ui-router/release/angular-ui-router.min.js'
            },
            {
              match: 'angular-resource',
              replacement: './vendor/angular-resource/angular-resource.min.js'
            }
          ]
        },
        files: [
          {
            expand: false,
            flatten: true,
            src: ['./public/app/config/configTemplate.js'],
            dest: './public/app/config/generatedConfig.js',
          },
          {
            expand: false,
            flatten: true,
            src: ['./public/index-template.html'],
            dest: './public/index.html',
          }
        ]
      },
      production: {
        options: {
          patterns: [
            {
              match: 'bootstrap-ui',
              // replacement: 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.13.0/ui-bootstrap-tpls.min.js'
              replacement: './vendor/angular-bootstrap/ui-bootstrap-tpls.min.js'
            },
            {
              match: 'apiUrl',
              replacement: 'http://api.secure-notes.xyz'
            },
            {
              match: 'bootstrapCss',
              replacement: '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css'
            },
            {
              match: 'angularJs',
              replacement: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js'
            },
            {
              match: 'angular-UI-Js',
              replacement: '//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.11/angular-ui-router.min.js'
            },
            {
              match: 'angular-resource',
              replacement: 'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-resource.min.js'
            }
          ]
        },
        files: [
          {
            expand: false,
            flatten: true,
            src: ['./public/app/config/configTemplate.js'],
            dest: './public/app/config/generatedConfig.js',
          },
          {
            expand: false,
            flatten: true,
            src: ['./public/index-template.html'],
            dest: './public/index.html',
          }
        ]
      }
    },
    copy: {
      main: {
        src: [
          './public/css/**/*',
          './public/dist/secure.notes.min.js',
          './public/index.html',
          './public/vendor/spin.js/spin.js',
          './public/vendor/angular-spinner/angular-spinner.min.js',
          './public/vendor/angular-google-plus/dist/angular-google-plus.min.js',
          './public/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js'
        ],
        expand: true,
        // cwd: 'dev',
        dest: 'production-code',
      }
    },
    ngAnnotate: {
        options: {
          add: true,
          singleQuotes: true
        },
        all: {
          src: ['./public/app/**/*.js', 'public/config/**/*.js']
            // files: {
            //     'public/dist/annotate.js': './public/app/**/*.js'
            // }
        }
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.keycdn.com',
          port: 21,
          authKey: 'privateKeyCustom'
        },
        cache: false,
        src: './production-code/public',
        dest: '/',
        forceVerbose: true,
        progress: true
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          './production-code/public/index.html': './production-code/public/index.html'     // 'destination': 'source'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-sftp-deploy');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('develop', ['replace:dev', 'html2js', 'uglify:dev', 'watch']);
  grunt.registerTask('deploy', ['replace:production', 'html2js', 'uglify:production', 'copy', 'htmlmin:dist'/*, 'ftp-deploy'*/]);
  // grunt.registerTask('deploy', ['replace:production', 'ngAnnotate', 'uglify:production', 'ftp-deploy']);
  // grunt.registerTask('deploy', ['replace:production', 'html2js', 'uglify:production']);

};
