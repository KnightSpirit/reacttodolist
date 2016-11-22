var gulp = require('gulp'),
       uglify = require('gulp-uglify'),
       cleanCSS = require('gulp-clean-css'),
       watch = require('gulp-watch'),
       webpack = require('webpack'),
       webpackConfig = require('./webpack.config.js'),
       serve = require('gulp-serve'),
       inject = require('connect-livereload')(),
       myConfig = Object.create(webpackConfig);

var paths = {
	scripts : ['index.js'],
	asserts : ['*.css', 'index.html']
}

gulp.task('default', ['build-dev'])

gulp.task('build-dev', ['webpack:dev-server', 'serve'], function(){
	livereload.listen({
		start:true
	})

	gulp.watch(paths.scripts, ['webpack:dev-server'])
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

gulp.task('serve', serve({
  root: [__dirname],
  // inject livereload script ot html
  middleware: inject
}))

gulp.task('webpack:dev-server', function () {
  var devServerConfig = webpackConfig; //Object.create(myConfig)
  console.log(webpackConfig);
  // webpack need this to send request to webpack-dev-server
  devServerConfig.output.publicPath = 'http://localhost:8080/'
  devServerConfig.plugins = devServerConfig.plugins || []
  devServerConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  // inline mode
  devServerConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server')
  var compiler = webpack(devServerConfig)
  new WebpackDevServer(compiler, {
    contentBase: 'http://localhost:3000/',
    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: false,
    // Don't forget this for dev-server
    publicPath: '/build/',
    lazy: false,
    hot: true
  }).listen(8080, 'localhost', function (err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
    // Server listening
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/')
  })
})