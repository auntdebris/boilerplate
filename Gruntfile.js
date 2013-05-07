'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

  // Initializes the Grunt tasks with the following settings
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Reload assets live in the browser
    // https://github.com/gruntjs/grunt-contrib-livereload
    livereload: {},

    // Start a connect web server
    // https://github.com/gruntjs/grunt-contrib-connect
    connect: {
      server: {
        options: {
          port: 9001,
          base: '.',
          keepalive: true
        }
      },
      livereload: {
        options: {
          port: 9001,
          base: '.',
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)];
          }
        }
      }
    },

    // Observe files for changes and run tasks
    // https://github.com/yeoman/grunt-regarde
    regarde: {
      files: {
        files: ['css/**/*.less', 'js/**/*.js', '*.html'],
        tasks: ['default', 'livereload']
      }
    },

    // Compile LESS files to CSS
    // https://github.com/gruntjs/grunt-contrib-less
    less: {
      development: {
        options: {
          paths: ['css/styles'] // Specifies directories to scan for @import directives when parsing
        },
        files: {
          // 'css/normalize.css':   'css/styles/normalize.less',
          // 'css/bootstrap.css':   'css/styles/bootstrap.less',
          'css/main.css':        'css/styles/main.less'
        }
      },
      dist: {
        options: {
          paths: ['css/styles'] 
        },
        files: {
          // 'dist/css/normalize.css': 'css/styles/normalize.less',
          // 'dist/css/bootstrap.css': 'css/styles/bootstrap.less',
          'dist/css/main.css':      'css/styles/main.less'
        }
      }
    },

    // Lint CSS files
    // https://github.com/gruntjs/grunt-contrib-csslint
    csslint: {
      strict: {
        options: {
          'adjoining-classes':  false,
          'unique-headings':    false,
          'qualified-headings': false
        },
        src: ['css/*.css']
      }
    },

    // Compress CSS files
    // https://github.com/gruntjs/grunt-contrib-cssmin
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.description %>\n @author: <%= pkg.author %>\n @email: <%= pkg.email %>\n @url: <%= pkg.homepage %>\n @version: <%= pkg.version %>\n*/\n'
      },
      minify: {
        expand: true,
        cwd: 'css',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      }
    },

    // Validate files with JSHint
    // https://github.com/gruntjs/grunt-contrib-jshint
    jshint: {
      options: {
        jshintignore: '.jshintignore', // Ignore files
        node: true  // This option defines globals available when your code is running inside of the Node runtime environment
      },
      beforeconcat: ['Gruntfile.js', 'scripts/*.js']
    },

    // Concatenate files
    // https://github.com/gruntjs/grunt-contrib-concat
    concat: {
      options: {
        separator: ';'
      },
      development: {
        src: ['js/scripts/main.js'],
        dest: 'js/main.js'
      },
      dist: {
        src: ['js/scripts/main.js'],
        dest: 'dist/js/main.js'
      }
    },

    // Minify files with UglifyJS
    // https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      options: {
        banner: '/*!\n <%= pkg.description %>\n @author: <%= pkg.author %>\n @email: <%= pkg.email %>\n @url: <%= pkg.homepage %>\n @version: <%= pkg.version %>\n*/\n'
      },
      dist: {
        files: {
          'dist/js/main.min.js': ['dist/js/main.js']
        }
      }
    },

    // Minify PNG and JPEG images
    // https://github.com/gruntjs/grunt-contrib-imagemin
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            cwd: 'images',
            src: ['**/*.png', '**/*.jpg'],
            dest: 'dist/images'
          }
        ]
      }
    },

    // Copy files and folders
    // https://github.com/gruntjs/grunt-contrib-copy
    copy: {
      main: {
        files: [
          { 
            expand: true, 
            cwd: 'html/',
            src: ['css/libs/**'], 
            dest: 'dist/'
          },
          { 
            expand: true, 
            cwd: 'html/',
            src: ['js/libs/**'], 
            dest: 'dist/'
          },
          { 
            expand: true, 
            cwd: 'html/',
            src: ['js/i18n/**'], 
            dest: 'dist/'
          },
          {
            expand: true, 
            flatten: true, 
            cwd: 'html/',
            src: ['js/plugins.js'], 
            dest: 'dist/js/', 
            filter: 'isFile'
          }
        ]
      }
    },

    // Clean files and folders
    // https://github.com/gruntjs/grunt-contrib-clean
    clean: ['dist']

  });

  // Load the plugins that provide the tasks we specified in package.json
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-regarde');

  // File tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Styles tasks
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
    
  // Scripts tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Images tasks
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Styles
  grunt.registerTask('styles', ['less:development'/*, 'csslint',*/]);

  // Scripts
  grunt.registerTask('scripts', [/*'jshint',*/ 'concat:development']);

  // Images
  grunt.registerTask('images', ['imagemin']);

  // Development build (default)
  grunt.registerTask('default', ['styles', 'scripts']);

  // Production build
  grunt.registerTask('dist', ['clean', 'less:dist'/*, 'csslint',*/, 'cssmin', /*'jshint',*/ 'concat:dist', 'uglify:dist', 'imagemin', 'copy']);

  // Server
  grunt.registerTask('server', ['livereload-start', 'connect:livereload', 'regarde']);
};