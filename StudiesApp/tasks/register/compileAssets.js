module.exports = function (grunt) {
  grunt.registerTask('test', ['mochaTest']);
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
		'less:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
