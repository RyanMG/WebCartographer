module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({

    stylus: {
      compile: {
        expand: true,
        cwd: 'resources/stylus',
        src:['main.styl'],
        dest: 'public/stylesheets',
        ext: '.css',
        options: {
          pretty: true,
          compress:false
        }
      }
    },
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
    watch: {
      compileStylus: {
        files: [ 'resources/stylus/**/*.styl' ],
        tasks: [ 'compileStylus' ],
        options: {
          livereload: true
        }
      },
      compileJade: {
        files: [ 'resources/jade/**/*.jade' ],
        tasks: [ 'compileJade' ],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('compileJade', ['jade']);
  grunt.registerTask('compileStylus', ['stylus']);

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('test', []);

};
