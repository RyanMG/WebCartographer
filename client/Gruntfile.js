module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({

    jade: {
      compile: {
        expand: true,
        cwd: 'resources/jade',
        src: ['index.jade'],
        dest: 'public/',
        ext: '.html',
        options: {
          pretty: true
        }
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'public/stylesheets/main.css': 'resources/sass/main.scss'
        }
      }
    },
    watch: {
      compileStylus: {
        files: [ 'resources/sass/**/*.scss' ],
        tasks: [ 'compileSass' ]
      },
      compileJade: {
        files: [ 'resources/jade/**/*.jade' ],
        tasks: [ 'compileJade' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('compileJade', ['jade']);
  grunt.registerTask('compileSass', ['sass:dist']);

  grunt.registerTask('default', ['watch']);

};
