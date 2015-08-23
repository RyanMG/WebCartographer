module.exports = function(grunt) {
  "use strict";

  require('load-grunt-tasks')(grunt); // preload dev files starting with 'grunt' from package.json

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    app: {
      server : 'server',
      client : 'client'
    },

    jade: {
      compile: {
        expand: true,
        cwd: '<%= app.client %>/resources/jade',
        src: ['index.jade'],
        dest: '<%= app.client %>/public/',
        ext: '.html',
        options: {
          pretty: false
        }
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          '<%= app.client %>/public/stylesheets/main.css': '<%= app.client %>/resources/sass/main.scss'
        }
      }
    },

    jshint: {
      options: {
        jshintrc : '.jshintrc'
      },
      src: ['<%= app.client %>/public/javascript/**/*.js']
    },

    watch: {
      lintJS: {
        files: [ '<%= app.client %>/public/javascript/**/*.js' ],
        tasks: [ 'jshint' ]        
      },
      compileSass: {
        files: [ '<%= app.client %>/resources/sass/**/*.scss' ],
        tasks: [ 'compileSass' ]
      },
      compileJade: {
        files: [ '<%= app.client %>/resources/jade/**/*.jade' ],
        tasks: [ 'compileJade' ]
      }
    }
  });

  grunt.registerTask('compileJade', ['jade']);
  grunt.registerTask('compileSass', ['sass:dist']);

  grunt.registerTask('develop', 'Develop the application', ['watch', 'jshint']);

  grunt.registerTask('default', ['develop']);

};
