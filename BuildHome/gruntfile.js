module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/css/',
          src: ['*.scss'],
          dest: 'src/css/',
          ext: '.css'
        }]
      }
    },
    watch: {
      css: {
        files: 'src/css/*.scss',
        tasks: ['sass'],
      },
    },
    concat: {
      js: {
        src: ['src/js/modernizr-custom.js','src/js/jcarousel.transitions.js'],
        dest: 'src/js/main.js'
      },
      css: {
        src: ['src/css/reset.css','src/css/icomoonstyle.css', 'src/css/jcarousel.transitions.css', 'src/css/style.css'],
        dest: 'src/css/main.css'
      }
    },
    uglify: {
      js: {
        files: {
          'js/main.min.js': ['src/js/main.js']
        }
      }
    },
    cssmin: {
      css: {
        files: {
          'css/main.min.css': ['src/css/main.css']
         }
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['*.{png,jpg}'],
          dest: 'img/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'imagemin']);

};
