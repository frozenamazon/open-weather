module.exports = function(grunt) {

  // Load the plugins.
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');

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
                  'images/*',
                  'modules/**/*',
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
    // Empties folders to start fresh
    clean: {
        dist: {
            files: [
                {
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= pkg.dest %>/*'
                    ]
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
    },
    protractor_webdriver: {
      target: {
        options: {
        },
      },
    },
    protractor: {
      options: {
        configFile: "node_modules/protractor/referenceConf.js", // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
      },
      target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
        options: {
          configFile: "protractor.conf.js" // Target-specific config file
        }
      }
    },
    cucumberjs: {
      options: {
        format: 'html',
        output: 'test/report/cucumber_report.html',
        theme: 'simple'
      },
      my_features: ['test/e2e/features/*.feature']
    },
    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
        options: {
            reporter: require('jshint-stylish')
        },
        all: [
            '<%= pkg.dest %>/modules/**/**/*.js'
        ]
    },
  });

  // Default task(s).
  grunt.registerTask('default', [
    'connect',
    'watch'
  ]);

  grunt.registerTask('utest', [
    'jshint',
    'karma'
  ]);

  grunt.registerTask('e2e', [
    'connect',
    'protractor_webdriver',
    'protractor'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'utest',
    'e2e',
    'useminPrepare',
    'concat',
    'uglify',
    'htmlmin',
    'usemin',
    'copy'
  ]);

};