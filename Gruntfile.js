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
          'public/dist/secure.notes.min.js': ['./public/dist/annotate.js']
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      files: './public/app/**/*.js',
      tasks: ['jslint', 'uglify']
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
        }
      }
    },
    replace: {
      dev: {
        options: {
          patterns: [
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
    ngAnnotate: {
        options: {
            singleQuotes: true
        },
        all: {
            files: {
                'public/dist/annotate.js': './public/app/**/*.js'
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

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('develop', ['replace:dev', 'uglify:dev', 'watch']);
  grunt.registerTask('deploy', ['replace:production', 'ngAnnotate', 'uglify:production']);

};
