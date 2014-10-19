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
            }
          ]
        },
        files: [
          {
            expand: false,
            flatten: true,
            src: ['./public/app/config/configTemplate.js'],
            dest: './public/app/config/generatedConfig.js',
          }
        ]
      },
      production: {
        options: {
          patterns: [
            {
              match: 'apiUrl',
              replacement: 'http://api.secure-notes.xyz'
            }
          ]
        },
        files: [
          {
            expand: false,
            flatten: true,
            src: ['./public/app/config/configTemplate.js'],
            dest: './public/app/config/generatedConfig.js',
          }
        ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-replace');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('develop', ['replace:dev', 'uglify:dev', 'watch']);

};
