/*
 * JSHint Configuration
 *
 * See all options: http://www.jshint.com/docs/options/
 */
module.exports = function( grunt ) {

    grunt.config( 'jshint', {
        all: [
            'js/**/*.js',
            '!js/library/*.js'
        ]
    });
    
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
};