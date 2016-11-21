var gulp = require('gulp'),
       uglify = require('gulp-uglify'),
       cleanCSS = require('gulp-clean-css'),
       watch = require('gulp-watch'),
       webpackConfig = require('./webpack.config.js'),
       myConfig = Object.create(webpackConfig);

var paths = {
	scripts : ['index.js'],
	asserts : ['*.css', 'index.html']
}

gulp.task('default', ['build-dev'])

gulp.task('build-dev', ['webpack:build-dev', 'serve'], function(){
	livereload.listen({
		start:true
	})

	gulp.watch(paths.scripts, ['webpack:build-dev'])
	var watcher = gulp.watch(paths.asserts)
	watcher.on('change', function(e){
		livereload.changed(e.path)
	})
})

gulp.task('watch', function(){
	gulp.watch('css/*.css', ['minify-css'])
})



gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});