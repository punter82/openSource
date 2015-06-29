module.exports = function( grunt ) {

    /* Configure */
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        buildRoot: '../',
        revision: 0, // updated via gitsvn:info task
    });

    /* Load tasks */
    grunt.loadTasks( 'grunt' );

    /* Task aliases */
    grunt.registerTask( 'default', 'Build for testing.', [
        // 'jshint', // Lint all appropriate js files
        'uglify:dist',
        'cssmin:dist'
    ]);
};
