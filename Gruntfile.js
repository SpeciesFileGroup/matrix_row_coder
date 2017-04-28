const BUILD_DIR = "build";
const SRC_DIR = "src";
const SRC_JS_MOCK = `${SRC_DIR}/entry-mock.js`;
const SRC_JS_LIVE = `${SRC_DIR}/entry-live.js`;
const SRC_INDEX = "index.html";
const BUILD_INDEX = `${BUILD_DIR}/index.html`;
const BUNDLED_JS = `${BUILD_DIR}/main.js`;

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    const taskConfig = {
        browserify: {
            buildMock: {
                options: {
                    transform: ['vueify'],
                    watch: true,
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: [SRC_JS_MOCK],
                dest: BUNDLED_JS
            },
            buildLive: {
                options: {
                    transform: ['vueify'],
                    watch: true,
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: [SRC_JS_LIVE],
                dest: BUNDLED_JS
            }
        },
        clean: {
            build: [BUILD_DIR]
        },
        connect: {
            build: {
                options: {
                    hostname: '127.0.0.1',
                    open: true,
                    port: 9000,
                    livereload: 35729,
                    base: BUILD_DIR
                }
            }
        },
        copy: {
            build: {
                files: [
                    {
                        src: SRC_INDEX,
                        dest: BUILD_INDEX
                    }
                ]
            }
        },
        mochaTest: {
            test: {
                options: {
                    bail: true
                },
                src: ['test/**/*.spec.js']
            }
        },
        watch: {
            options: {
                livereload: true
            }
        }
    };

    grunt.initConfig(taskConfig);

    grunt.registerTask('test', [
        'mochaTest:test'
    ]);

    grunt.registerTask('pre-build', [
        'clean',
        'copy:build'
    ]);

    grunt.registerTask('build-mock', [
        'pre-build',
        'browserify:buildMock'
    ]);

    grunt.registerTask('build-live', [
        'pre-build',
        'browserify:buildLive'
    ]);

    grunt.registerTask('serve-mock', [
        'build-mock',
        'connect:build',
        'watch'
    ]);

    grunt.registerTask('serve-live', [
        'build-live',
        'connect:build',
        'watch'
    ]);
};