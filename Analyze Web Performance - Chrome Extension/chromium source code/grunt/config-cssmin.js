/*
 * Css min Configuration
 *
 * See all options: https://github.com/gruntjs/grunt-contrib-cssmin
 */
module.exports = function( grunt ) {

    grunt.config( 'cssmin', {
        dist: {
        	options: {
		      banner: '/* Minified css file */'
		    },
		    files: {
		      'css/popup-min.css': ['css/popup.css']
		    }
		        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-cssmin');
};
