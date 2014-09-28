'use strict';




module.exports = function (grunt){

    // load grunt tasks
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({

        watch: {
            sass: {
                files: ['app/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass:dev']
            },
            views: {
                files: ['app/views/*.ejs'],
                tasks: ['copy:views']
            },
            components: {
                files: ['app/components/**/*'],
                tasks: ['copy:components']
            },
            icons: {
                files: ['public/images/svg-files/**/*.svg'],
                tasks: ['grunticon']
            },
            images: {
                files: ['app/images/{,*/}*.{png,jpg,jpeg,gif}'],
                tasks: ['imagemin']
            },
            svgs: {
                files: ['app/images/{,*/}*.svg'],
                tasks: ['svgmin']
            },
            scripts:{
                files: ['app/js/**/*.js'],
                tasks: ['ngAnnotate']
            }
        },
        sass:{
            options:{
                compass: true
            },
            dev:{
                options: {
                    style: 'nested'
                },
                files: [{
                    expand: true,
                    cwd: 'app/styles',
                    src: ['*.scss'],
                    dest: 'public/styles',
                    ext: '.css'
                }]
            },
            dist:{
                options: {
                    style: 'expanded',
                    sourcemap: 'auto'
                },
                files: [{
                    expand: true,
                    cwd: 'app/styles',
                    src: ['*.scss'],
                    dest: 'public/styles',
                    ext: '.css'
                }]
            }
        },
        clean: {
            views:{
                files:[{
                    src:[
                        'public/views/*'
                    ]
                }]
            },
            js:{
                files:[{
                    src:[
                        'public/js/**/*',
                        '!public/js/main.js'
                    ]
                }]
            }
        },
        copy: {
            views: {
                files:[{
                    expand: true,
                    cwd: 'app/views',
                    dest: 'public/views',
                    src: [
                        '*.ejs'
                    ]
                }]
            },
            components: {
                files:[{
                    expand: true,
                    cwd: 'app/components',
                    dest: 'public/components',
                    src: [
                        '**/*'
                    ]
                }]
            }
        },
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/js',
                    src: ['**/*.js'],
                    dest: 'public/js'
                }]
            }
        },
        useminPrepare: {
            options:{
                dest: 'public',
                root: 'public'
            },
            dist: {
                src: ['app/views/*.ejs']
            }
        },
        usemin:{
            html:['public/views/*.ejs']
        },
        grunticon: {
            misc: {
                files: [{

                    expand: true,
                    cwd: 'public/images/svg-files',
                    src: ['*.svg'],
                    dest: 'public/icons'
                }],
                options: {
                    cssprefix: '.'
                }
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: 'public/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    src: '{,*/}*.svg',
                    dest: 'public/images'
                }]
            }
        },
        concurrent:{
            dev:[
                'sass:dev',
                'ngAnnotate',
                'imagemin',
                'svgmin'
            ]
        },
        pagespeed: {
            options: {
                nokey: true
            },
            desktop: {
                options: {
                    url: "http://admdesktop.taikocloud.com/",
                    locale: "de_DE",
                    strategy: "desktop",
                    threshold: 80
                }
            },
            mobile: {
                options: {
                    url: "http://admdesktop.taikocloud.com/",
                    locale: "de_DE",
                    strategy: "mobile",
                    threshold: 80
                }
            }
        }
    });

    grunt.registerTask('dev', [
        'clean',
        'copy',
        'concurrent:dev',
        'grunticon'
    ]);

    grunt.registerTask('build', [
        'dev',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'dev',
        'watch'
    ]);

}