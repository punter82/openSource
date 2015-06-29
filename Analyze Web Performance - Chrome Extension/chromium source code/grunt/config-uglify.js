/*
 * Uglify Configuration
 *
 * See all options: https://github.com/gruntjs/grunt-contrib-uglify
 */
module.exports = function( grunt ) {

    grunt.config( 'uglify', {

        dist: {

            files: {
            	'js/app/popup-min.js': ['js/app/popup.js'],
            	'js/plugin/bootstrap-min.js': ['js/plugin/bootstrap.js'],
            	'js/plugin/content-scripts-min.js': ['js/plugin/content-scripts.js'],
        			}

        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};