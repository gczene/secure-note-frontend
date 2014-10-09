module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        sourceMap: true,
        mangle: false,
        beautify: true
      },
      build: {
        src: ['./public/app/**/*.js'],
        dest: 'public/dist/secure.notes.min.js'
      }
    },
    watch: {
      files: './public/app/**/*.js',
      tasks: ['jslint', 'uglify']
    },
    jslint: {
      all: {
        src: ['./public/app/**/*.js'],
        directives: {
          globals: ['angular', 'console'],
          unparam: true,
          nomen: true
        },
        options: {
          errorsOnly: true,
          failOnError: false,
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jslint');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
