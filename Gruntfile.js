const BUILD_DIR = "build";
const SRC_DIR = "src";
const SRC_JS = `${SRC_DIR}/entry.js`;
const SRC_INDEX = "index.html";
const BUILD_INDEX = `${BUILD_DIR}/index.html`;
const BUNDLED_JS = `${BUILD_DIR}/main.js`;

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    const taskConfig = {
        browserify: {
            build: {
                options: {
                    transform: ['vueify'],
                    watch: true,
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: [SRC_JS],
                dest: BUNDLED_JS
            }
        },
        clean: {
            build: [BUILD_DIR]
        },
        connect: {
            build: {
                options: {
                    open: true,
                    port: 9000,
                    livereload: 35729,
                    base: BUILD_DIR
                }
            }
        },
        copy: {
            build: {
                files: [{
                    src: SRC_INDEX,
                    dest: BUILD_INDEX
                }]
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

    grunt.registerTask('build', [
        'clean',
        'copy:build',
        'browserify:build'
    ]);

    grunt.registerTask('serve', [
        'build',
        'connect:build',
        'watch'
    ]);
};