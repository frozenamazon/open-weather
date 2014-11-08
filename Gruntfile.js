module.exports = function(grunt) {

  // Load the plugins.
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-karma');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: true,

      }
    },
    copy:{
      main: {
        files: [
          {
              expand: true,
              dot: true,
              cwd: '<%= pkg.app %>',
              dest: '<%= pkg.dest %>',
              src: [
                  'fonts/*',
                  'css/*',
                  'images/*'
              ]
          },
        ],
      }
    },
    connect: {
        server:{
            options: {
              port:9000,
              hostname: '*',
              livereload: true,
              base: 'app'
            }
        }
    },
    watch: {
      options: {
        livereload: true
      },
      src: {
        files: ['app/modules/{,*/}*.js', 'app/css/*.css', 'app/index.html']
      }
    },
    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
        html: '<%= pkg.app %>/index.html',
        options: {
            dest: '<%= pkg.dest %>'
        }
    },
    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
        html: ['<%= pkg.dest %>/{,*/}*.html'],
        options: {
            assetsDirs: ['<%= pkg.dest %>']
        }
    },
    htmlmin: {
        dist: {
            files: [
                {
                    expand: true,
                    cwd: '<%= pkg.app %>',
                    src: ['*.html'],
                    dest: '<%= pkg.dest %>'
                }
            ]
        }
    },
    // Test settings
    karma: {
        unit: {
            configFile: 'karma.conf.js',
            singleRun: true
        }
    }
  });

  // Default task(s).
  grunt.registerTask('default', [
    'connect',
    'watch'
  ]);

  grunt.registerTask('test', [
    'karma'
  ]);

  grunt.registerTask('build', [
    'useminPrepare',
    'concat',
    'uglify',
    'htmlmin',
    'usemin',
    'copy'
  ]);

};