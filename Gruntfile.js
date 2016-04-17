module.exports = function(grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            js: {
                src: ["assets/build/main.js"]
            },
            images: {
                src: ["assets/build/**/*.{png,jpg,gif}", "!assets/build/emoji/**"]
            },
            gemoji: {
                src: ["assets/build/emoji"]
            }
        },
        uglify: {
            js: {
                files: {
                    'assets/build/main.js': [
                        // 'bower_components/ga-lite/dist/ga-lite.js',
                        'bower_components/vanilla-lazyload/dist/lazyload.js',
                        'bower_components/loadcss/src/loadCSS.js',
                        '_js/loadJs.js',
                        '_js/progressBar.js',
                        '_js/ready.js',
                        '_js/xhrLinks.js',
                        '_js/heymoji.js',
                        '_js/main.js'
                    ]
                }
            }
        },
        imagemin: {
            images: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: '_images/',
                    src: ['**/*.{jpg,gif}'],
                    dest: 'assets/build/'
                }]
            }
        },
        pngquant: {
            images: {
                options: {
                    quality: 10
                },
                files: [{
                    expand: true,
                    cwd: '_images/',
                    src: ['**/*.png'],
                    dest: 'assets/build/'
                }]
            },
            gemoji: {
                options: {
                    quality: 10
                },
                files: [{
                    expand: true,
                    cwd: 'bower_components/gemoji/images/emoji/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/build/emoji/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-pngquant');

    grunt.registerTask('js', ['clean:js', 'uglify:js']);
    grunt.registerTask('images', ['clean:images', 'imagemin:images',  'pngquant:images']);
    grunt.registerTask('gemoji', ['clean:gemoji', 'pngquant:gemoji']);


    grunt.registerTask('all', ['js', 'images', 'gemoji']);

    grunt.registerTask('default', ['js', 'images']);
};
