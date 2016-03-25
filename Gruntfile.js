module.exports = function(grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            js: {
                src: ["assets/build/main.js"]
            },
            images: {
                src: ["assets/build/**/*.{png,jpg,gif}", "!assets/build/emoji"]
            },
            gemoji: {
                src: ["assets/build/emoji"]
            }
        },
        uglify: {
            js: {
                files: {
                    'assets/build/main.js': [
                        'bower_components/ga-lite/dist/ga-lite.js',
                        'bower_components/vanilla-lazyload/dist/lazyload.js',
                        'bower_components/loadcss/src/loadCSS.js',
                        '_js/ready.js',
                        '_js/main.js'
                    ]
                }
            }
        },
        imagemin: {
            images: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '_images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/build/'
                }]
            }
        },
        pngmin: {
            gemoji: {
                options: {
                    concurrency: 8, // specify how many exucutables get spawned in parallel
                    colors: 128, // reduce colors to 128
                    ext: '.png', // use .png as extension for the optimized files
                    quality: '10-80', // output quality should be between 65 and 80 like jpeg quality
                    speed: 3, // pngquant should be as fast as possible
                    iebug: false // optimize image for use in Internet Explorer 6
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
    grunt.loadNpmTasks('grunt-pngmin');

    grunt.registerTask('js', ['clean:js', 'uglify:js']);
    grunt.registerTask('images', ['clean:images', 'imagemin:images']);
    grunt.registerTask('gemoji', ['clean:gemoji', 'pngmin:gemoji']);


    grunt.registerTask('all', ['js', 'images', 'gemoji']);

    grunt.registerTask('default', ['js', 'images']);
};
