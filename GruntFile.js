module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        javascripts: ['frontend/javascripts/**/*.js'],
        server_js: ['backend/**/*.js'],
        templates: ['frontend/javascripts/**/*.jade'],
        stylesheets: ['frontend/styles/general/**/*.styl', 'frontend/styles/style.styl'],
        views: ['frontend/views/**/*.jade'],

        jshint: {
            client: ['Gruntfile.js', '<%= javascripts %>', '!frontend/javascripts/libs/**/*.js'],
            server: ['<%= server_js %>'],
            options: {
                sub: true,
                smarttabs: true,
                multistr: true,
                loopfunc: true
            }
        },

        watch: {
            options: {
                livereload: false
            },
            scripts: {
                files: ['<%= javascripts %>'],
                tasks: ['javascripts']
            },
            server_js: {
                files: ['<%= server_js %>'],
                tasks: ['jshint:server'],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: ['<%= stylesheets %>'],
                tasks: ['stylus']
            },
            jade_templates: {
                files: ['<%= templates %>'],
                tasks: ['jade:templates']
            },
            jade_pages: {
                files: ['<%= views %>'],
                tasks: ['jade:pages']
            },
        },

        jade: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'frontend/javascripts/',
                    src: ['**/*.jade'],
                    dest: 'public/templates/',
                    ext: '.html'
                }],
            },
            pages: {
                files: {
                    'public/_index.html': 'frontend/views/index.jade'
                }
            }
        },

        stylus: {
            compile: {
                options: {
                    'include css': true,
                    'paths': ['frontend/styles/'],
                    'compress': true
                },
                files: {
                    'public/styles/css/style.css': ['<%= stylesheets %>']
                }
            }
        },

        copy: {
            libs: {
                files: [{
                    expand: false,
                    src: ['bower_components/requirejs/require.js'],
                    dest: 'public/javascripts/libs/require.js'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: 'frontend/javascripts/',
                    src: ['**'],
                    dest: 'public/javascripts/'
                }]
            },
            resources: {
                files: [{
                        expand: true,
                        cwd: 'frontend/resources/',
                        src: ['**'],
                        dest: 'public/resources/'
                    }
                ]
            },
            images: {
                files: [{
                    expand: true,
                    cwd: 'frontend/images/',
                    src: ['**'],
                    dest: 'public/images/'
                }]
            }
        },

        clean: {
            public_js: {
                src: ['public/javascripts']
            }
        },

        browserify: {
            my: {
                dest: 'public/javascripts/main.js',
                src: ['frontend/javascripts/**/*.js']
            }
        },

        concat: {
            options: {
                separator: '\n'
            },
            js: {
                src: [
                    'node_modules/angular/angular.js',
                    'node_modules/angular-route/angular-route.js',
                    'node_modules/ng-file-upload/dist/ng-file-upload.js',
                    'node_modules/ng-file-upload/dist/ng-file-upload-shim.js'],
                dest: 'public/javascripts/libs.js',
            },
            css: {
                src: [],
                dest: 'public/styles/css/libs.css'
            }
        },

        uglify: {
            options: {
                report: 'min',
                mangle: false
            },
            libs: {
                files: {
                    'public/javascripts/libs.js': ['public/javascripts/libs.js']
                }
            },
            main: {
                files: {
                    'public/javascripts/main.js': ['public/javascripts/main.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('common', ['clean', 'jshint', 'jade', 'stylus', 'copy', 'concat']);
    grunt.registerTask('release', ['clean', 'jshint', 'jade', 'stylus', 'copy', 'concat', 'browserify', 'uglify']);
    grunt.registerTask('javascripts', ['jshint', 'clean', 'copy', 'concat', 'browserify']);
    grunt.registerTask('default', ['common', 'browserify', 'concat']);
    grunt.registerTask('dev', ['common', 'browserify', 'concat', 'watch', 'open']);
};