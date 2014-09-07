'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var customWatchTasks = [];

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var yeomanConfig = {
      // configurable paths
      app: require('./bower.json').appPath || 'public',
      dist: 'dist'
    };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: yeomanConfig,

    replace: {
      prod: {
        options: {
          variables : {
            CFG : 'cfg_prod.js'
          },
          prefix : '@@'
        },
        files : [
          {src : ['<%= yeoman.app %>/index.html'], dest : '.tmp/index.html'},
        ]
      },
      dev: {
        options: {
          variables : {
            CFG : 'cfg_dev.js'
          },
          prefix : '@@'
        },
        files : [
          {src : ['<%= yeoman.app %>/index.html'], dest : '.tmp/index.html'},
        ]
      }
    },

    AsyncDeps: {
      dist:{
        files: {
          '<%= yeoman.dist %>/index.html': '<%= yeoman.dist %>/index.html'
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      scripts: {
        files: [
          '<%= yeoman.app %>/index.html',
        ],
        tasks:  customWatchTasks
      },
      // js: {
      //   files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
      //   tasks: ['newer:jshint:all'],
      //   options: {
      //     livereload: 9899
      //   }
      // },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '<%= yeoman.app %>/styles/{,*/}*.css',
          '<%= yeoman.app %>/styles/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.app %>/{,*/}*.json',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9001,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 9899
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
      port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*',
            '!<%= yeoman.dist %>/config.xml',
            '!<%= yeoman.dist %>/res'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    'bower-install': {
      app: {
        html: '<%= yeoman.app %>/index.html',
        ignorePath: '<%= yeoman.app %>/'
      }
    },




    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/styles/img/generated',
        imagesDir: '<%= yeoman.app %>/styles/img',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/styles/img',
        httpGeneratedImagesPath: '/styles/img/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/styles/img/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            //'<%= yeoman.dist %>/styles/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '.tmp/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles/img',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/styles/img'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles/img',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/styles/img'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', '!index.html'/*, 'views/*.html'*/],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    ngtemplates: {
      dist: {
        options :{
          usemin: 'scripts/scripts.js',
          module: 'StarterApp'      , 
        },
        cwd: 'app',
        
          
        src: ['views/**.html', 'views/partials/**.html'],
        dest: '.tmp/scripts/templateCache.js'
      }
    },

    smoosher: {
      all: {
        files: {
          '<%= yeoman.dist %>/index.html': '<%= yeoman.dist %>/index.html',
        },
      },
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            '*.js',
            '*.xml',
            'views/{,*/}*.html',
            'bower_components/es5-shim/**/*',
            'bower_components/json3/**/*',
            'styles/img/{,*/}*.{webp,png,gif}',
            'styles/fonts/{,*/}*.*',
            'res/{,*/,**/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/styles/img',
          dest: '<%= yeoman.dist %>/styles/img',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      cordova_app: {
        expand: true,
        cwd: 'app/', src: [
          'bower_components/**',
          'lang/**',
          'scripts/**',
          'styles/**',
          'views/**',
          '*.js',
          '*.html',
          'res/**',
          'icon.png'
        ],  dest: 'cordova/www/'
      },
      cordova_res: {
        expand: true,
        cwd: 'app/', src: 'res/**', dest: 'cordova/'
      },
      cordova_config: {
        expand: true,
        cwd: 'app/', src: 'config.xml', dest: 'cordova/'
      }
    },

    rename : {
      phonegap : {
        src : '<%= yeoman.dist %>/index.html',
        dest : '<%= yeoman.dist %>/main.html'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    cdn: {
        options: {
          /** @optional  - if provided both absolute and relative paths will be converted */
          flatten: true,
          base : '<%= yeoman.dist %>', // used for css link replacement (here it is relative to css path)
          /** @optional  - if provided will be added to the default supporting types */
          supportedTypes: { 'phtml': 'html' },
          cdn : '<%= yeoman.cdn %>',
          //ignorePath : /preload|intro/
        },
        phonegap : {
          src: ['<%= yeoman.dist %>/styles/intro.css'],
        },
    },

    exec: {
      fb_plugin : {
        command: 'cd cordova && cordova -d plugin add https://github.com/phonegap/phonegap-facebook-plugin.git --variable APP_ID="733007940074530" --variable APP_NAME="K-Quiz" && echo "android.library.reference.2=FacebookLib" >> platforms/android/project.properties && cp platforms/android/local.properties platforms/android/FacebookLib && android update project -p platforms/android/ && cd platforms/android/ && ant clean && cd FacebookLib && ant clean && ant release',
        stdout: true      
      },
      run_all : {
        command: 'bash run_all.sh',
        stdout: true
      },
    },

    cordovacli: {
      options: {
          path: 'cordova'
      },
      cordova: {
          options: {
              command: ['create','platform','plugin','build'],
              platforms: ['ios','android'],
              plugins: ['device','dialogs'],
              path: 'cordova',
              id: 'com.sparted.kquiz',
              name: 'K-Quiz'
          }
      },
      create: {
          options: {
              command: 'create',
              id: 'com.sparted.kquiz',
              name: 'K-Quiz'
          }
      },
      add_android: {
        options: {
          command: 'platform',
          action: 'add',
          platforms: ['android']
        }
      },
      add_ios: {
        options: {
          command: 'platform',
          action: 'add',
          platforms: ['ios']
        }
      },
      add_platforms: {
          options: {
              command: 'platform',
              action: 'add',
              platforms: ['ios', 'android']
          }
      },
      add_plugins: {
          options: {
              command: 'plugin',
              action: 'add',
              plugins: [
                  'org.apache.cordova.splashscreen',
                  'org.apache.cordova.dialogs',
                  'org.apache.cordova.statusbar'
              ]
          }
      },
      build_ios: {
          options: {
              command: 'build',
              platforms: ['ios']
          }
      },
      build_android: {
          options: {
              command: 'build',
              platforms: ['android']
          }
      },
      run_android: {
          options: {
              command: 'run',
              platforms: ['android']
          }
      },
      run_ios: {
          options: {
              command: 'run',
              platforms: ['ios']
          }
      },
      emulate_android: {
          options: {
              command: 'emulate',
              platforms: ['android'],
              args: ['--target','Nexus5']
          }
      }
    },

    // phonegap: {
    //   config: {
    //     root: 'app',
    //     config: 'app/config.xml',
    //     cordova: 'phonegap/.cordova',
    //     html : 'index.html', // (Optional) You may change this to any other.html
    //     path: 'phonegap',
    //     plugins: ['org.apache.cordova.dialogs'],
    //     platforms: ['android'],
    //     maxBuffer: 200, // You may need to raise this for iOS.
    //     verbose: true,
    //     releases: 'releases',
    //     releaseName: function(){
    //       var pkg = grunt.file.readJSON('package.json');
    //       return(pkg.name + '-' + pkg.version);
    //     },
    //     debuggable: false,

    //     // Must be set for ios to work.
    //     // Should return the app name.
    //     name: function(){
    //       var pkg = grunt.file.readJSON('package.json');
    //       return pkg.name;
    //     },

    //     // Add a key if you plan to use the `release:android` task
    //     // See http://developer.android.com/tools/publishing/app-signing.html
    //     key: {
    //       store: 'release.keystore',
    //       alias: 'release',
    //       aliasPassword: function(){
    //         // Prompt, read an environment variable, or just embed as a string literal
    //         return('');
    //       },
    //       storePassword: function(){
    //         // Prompt, read an environment variable, or just embed as a string literal
    //         return('');
    //       }
    //     },

    //     // Set an app icon at various sizes (optional)
    //     icons: {
    //       android: {
    //         ldpi: 'icon-36-ldpi.png',
    //         mdpi: 'icon-48-mdpi.png',
    //         hdpi: 'icon-72-hdpi.png',
    //         xhdpi: 'icon-96-xhdpi.png'
    //       },
    //       wp8: {
    //         app: 'icon-62-tile.png',
    //         tile: 'icon-173-tile.png'
    //       },
    //       ios: {
    //         icon29: 'icon29.png',
    //         icon29x2: 'icon29x2.png',
    //         icon40: 'icon40.png',
    //         icon40x2: 'icon40x2.png',
    //         icon57: 'icon57.png',
    //         icon57x2: 'icon57x2.png',
    //         icon60x2: 'icon60x2.png',
    //         icon72: 'icon72.png',
    //         icon72x2: 'icon72x2.png',
    //         icon76: 'icon76.png',
    //         icon76x2: 'icon76x2.png'
    //       }
    //     },

    //     // Set a splash screen at various sizes (optional)
    //     // Only works for Android and IOS
    //     screens: {
    //       android: {
    //         ldpi: 'screen-ldpi-portrait.png',
    //         // landscape version
    //         ldpiLand: 'screen-ldpi-landscape.png',
    //         mdpi: 'screen-mdpi-portrait.png',
    //         // landscape version
    //         mdpiLand: 'screen-mdpi-landscape.png',
    //         hdpi: 'screen-hdpi-portrait.png',
    //         // landscape version
    //         hdpiLand: 'screen-hdpi-landscape.png',
    //         xhdpi: 'screen-xhdpi-portrait.png',
    //         // landscape version
    //         xhdpiLand: 'www/screen-xhdpi-landscape.png'
    //       },
    //       ios: {
    //         // ipad landscape
    //         ipadLand: 'screen-ipad-landscape.png',
    //         ipadLandx2: 'screen-ipad-landscape-2x.png',
    //         // ipad portrait
    //         ipadPortrait: 'screen-ipad-portrait.png',
    //         ipadPortraitx2: 'screen-ipad-portrait-2x.png',
    //         // iphone portrait
    //         iphonePortrait: 'screen-iphone-portrait.png',
    //         iphonePortraitx2: 'screen-iphone-portrait-2x.png',
    //         iphone568hx2: 'screen-iphone-568h-2x.png'
    //       }
    //     },

    //     // Android-only integer version to increase with each release.
    //     // See http://developer.android.com/tools/publishing/versioning.html
    //     versionCode: function(){ return(1) },

    //     // Android-only options that will override the defaults set by Phonegap in the
    //     // generated AndroidManifest.xml
    //     // See https://developer.android.com/guide/topics/manifest/uses-sdk-element.html
    //     minSdkVersion: function(){ return(10) },
    //     targetSdkVersion: function(){ return(19) },

    //     // iOS7-only options that will make the status bar white and transparent
    //     iosStatusBar: 'WhiteAndTransparent',

    //     // If you want to use the Phonegap Build service to build one or more
    //     // of the platforms specified above, include these options.
    //     // See https://build.phonegap.com/
    //    /* remote: {
    //       username: 'your_username',
    //       password: 'your_password',
    //       platforms: ['android', 'blackberry', 'ios', 'symbian', 'webos', 'wp7']
    //     },*/

    //     // Set an explicit Android permissions list to override the automatic plugin defaults.
    //     // In most cases, you should omit this setting. See 'Android Permissions' in README.md for details.
    //     permissions: ['INTERNET', 'ACCESS_COURSE_LOCATION', '...']
    //   }
    // }
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    customWatchTasks.push('replace:dev');

    grunt.task.run([
      'clean:server',
      'replace:dev',
      //'concurrent:server',
      //'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  // grunt.registerTask('build', function(target) {
  //   console.log(target)

  //   if(target=='web') {
  //     yeomanConfig.dist = "dist";
  //   } else if (target=='phonegap') {
  //     yeomanConfig.dist = "phonegap/www";
  //     yeomanConfig.cdn = "./";
  //   } else if (target=='cordova') {
  //     yeomanConfig.dist = "cordova/www";
  //   } else {
  //     throw "This target does not exists"
  //   }

  //   var tasks = [
  //     'clean:dist',
  //     'replace:prod',
      
  //     'useminPrepare',
  //     'ngtemplates:dist',
  //     'concurrent:dist',
  //     'autoprefixer',
  //     'concat',
  //     'ngmin',
  //     'copy:dist',
  //     'cdnify',
  //     'cssmin',
  //     'uglify',
  //     'rev',
  //     'usemin',
  //     'htmlmin',
  //     'AsyncDeps',
  //     'smoosher'
  //   ];
  //   if(target== 'phonegap') {
  //     tasks.push('rename:phonegap');
  //     grunt.task.registerTask('phonegap-scaffhold', '', function() {
  //        grunt.file.write(yeomanConfig.dist + '/index.html',  "<!doctype html><html><head><title>Tracktl</title><script type=\"text/javascript\" src=\"cordova.js\"></script><script>document.addEventListener('deviceready', function(){window.location='./main.html#phonegap';}, false);</script></head><body></body></html>");
  //     });
  //     tasks.push('phonegap-scaffhold');
  //     tasks.splice(tasks.indexOf('usemin')+1,0,'cdn:phonegap');
  //     tasks.splice(tasks.indexOf('rev'), 1);
  //     console.log(tasks)
  //   }
  //   grunt.task.run(tasks);
  // });

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('prepare', [
    'copy:cordova_config',
    'copy:cordova_res',
    'copy:cordova_app',
  ]);

  grunt.registerTask('init', [
    'cordovacli:create',
    'cordovacli:add_android',
    'cordovacli:add_plugins',
    'exec:fb_plugin'
  ]);

  grunt.registerTask('run', [
    'prepare',
    'cordovacli:run_android'
  ]);

  grunt.registerTask('run_all', [
    'prepare',
    'exec:run_all'
    ])

  grunt.registerTask('run_ios', [
    'prepare',
    'cordovacli:run_ios'
  ]);

};
