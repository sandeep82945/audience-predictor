(function() {
  'use strict';
  module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt)

    grunt.initConfig({
      browserify: {
        dist: {
          options: {
            debug: true
          },
          files: {
            'build/audience_predictor.new.js': ['src/js/audience_predictor.js'],

          }
        }
      },
      babel: {
        compile: {
          options: {
            presets: ['es2015'],
            compact: false
          },
          files: {
            'build/audience_predictor.js': ['build/audience_predictor.new.js']
          }
        }
      },
      sass: {
        options: {
          outputStyle: 'compressed'
        },
        dist: {
          files: {
            
          }
        }
      },
      watch: {
        scripts: {
          files: ['src/**/*.js', 'test/**/*.js', 'src/**/*.scss', 'lib/**/*.js', 'samples/**/*.js'],
          tasks: ["unsafe_build"],
          options: {
            spawn: false,
            interrupt: true,
            debounceDelay: 250,
          },
        },
      },

      jshint: {
        all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        options: {
          esversion: 6,
          asi: true,
          boss: false,
          maxparams: 4,
          maxdepth: 2,
          maxstatements: 13,
          maxcomplexity: 5
        }
      },
      eslint: {
        options: {
          parserOptions: {
            ecmaVersion: 6
          },
          "rules": {
            "indent": ["error", 2],
            "no-unused-vars": ["error", { "vars": "all", "args": "after-used" }],
            "no-undef": "error",
            "no-unreachable": "error",
            complexity: 0,
            'dot-notation': 2,
            'dot-location': [ 2, 'property' ],
            eqeqeq: 2,
            //'no-alert': 2,
            'no-implicit-coercion': 0,
            'no-implied-eval': 2,
            'no-invalid-this': 2,
            'no-labels': 2,
            'no-loop-func': 2,
            'no-new-func': 2,
            'no-new-wrappers': 2,
            'no-new': 2,
            'no-octal-escape': 2,
            'no-octal': 2,
            'no-param-reassign': 0,
            'no-process-env': 1,
            'no-unused-expressions': 2,
            'no-useless-concat': 2,
            'no-void': 2,
            'no-with': 2,
            'wrap-iife': [ 2, 'inside' ],
            yoda: [ 2, 'never', { exceptRange: true } ] 
          }
        },
        target: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
      },
      clean: {
        new: ['./build/**/*.new.js']
      },
      
      uglify: {
        my_target: {
          files: {
            'build/audience_predictor.min.js': ['build/audience_predictor.js'],
          }
        }
    
      },
      exec: {
        'electron-mocha': 'npm test'
      },
      complexity: {
        generic: {
          src: ['build/**/*.js'],
          options: {
            breakOnErrors: false,
            jsLintXML: 'complexity_report.xml', // create XML JSLint-like report
            errorsOnly: false,               // show only maintainability errors
            cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
            halstead: [8, 13, 20],           // or optionally a single value, like 8
            maintainability: 100,
            hideComplexFunctions: false,     // only display maintainability
            broadcast: false                 // broadcast data over event-bus
          }
        }
      },
    });

    grunt.loadTasks('tasks')
    grunt.registerTask("default", ["watch"])
    //grunt.registerTask("test", ["exec:electron-mocha"])
    grunt.registerTask("unsafe_build", ["browserify", "babel", "clean", "uglify" ])
    grunt.registerTask("build", ["jshint", "eslint", "unsafe_build"])
    //grunt.registerTask("build_test", ["build", "test"])
  };
})();

