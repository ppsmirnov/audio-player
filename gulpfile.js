var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var spritesmith = require('gulp.spritesmith');
var webpack = require('webpack');
var Server = require('karma').Server;
var jade = require('gulp-jade');
var WebpackDevServer = require("webpack-dev-server");
var gutil = require("gulp-util");



var folder = './scss';
var spriteFolder = './images';
var files = '**/*.scss';


gulp.task('styles', function () {
  gulp.src([folder + files, '!' + folder + 'active_admin.scss'])
      .pipe(sourcemaps.init())
      // Converts Sass into CSS with Gulp Sass
      .pipe(sass()).on('error',  (err) => {
        sass.logError.call(this, err);
      }).pipe(sourcemaps.write())
      .pipe(autoprefixer({
        browsers: ['last 2 version', 'IE 9']
      }))
      // Outputs CSS files in the css folder
      .pipe(gulp.dest(folder));
});

gulp.task('sprites', function() {

  var spriteData = gulp.src(spriteFolder + '*.png').pipe(spritesmith({
    imgName: 'sprite__generated.png',
    cssName: 'base/_sprite.scss',
    imgPath: 'sprites/sprite__generated.png'
  }));

  spriteData.img.pipe(gulp.dest(spriteFolder));
  spriteData.css.pipe(gulp.dest(folder));
});

gulp.task('jasmine', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('watch', function () {
  // Watches the scss folder for all .scss and .sass files
  // If any file changes, run the sass task
  gulp.watch(spriteFolder, ['sprites']);
  gulp.watch(folder + files, ['styles']);
  gulp.watch('./jade/*.jade', ['jade']);
});

gulp.task('watchTest', function() {
  gulp.watch('./javascripts/*', ['test']);
});

gulp.task('gzip', function() {
  var inp = fs.createReadStream('input.txt');
  var out = fs.createWriteStream('input.txt.gz');
});

gulp.task("server", function(callback) {
  // modify some webpack config options
  var myConfig = require('./webpack.config.js');

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath: "/assets/",
    stats: {
      colors: true
    },
    hot: true
  }).listen(8080, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      gutil.log("[webpack-dev-server]", "http://localhost:8080/dist");
    });
});


gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src('./jade/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'))
});

//build
const webpackDefaultConfig = require('./webpack_build');

function runWebpack(config) {
  webpack(config, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // console output
      assets: true,
      colors: true,
      version: true,
      hash: true,
      timings: true,
      chunks: true,
      chunkModules: false,
      cached: true,
      reasons: true,
      errorDetails: true
    }));
  });
}

gulp.task('webpack_build', function(cb) {
  runWebpack(webpackDefaultConfig);
  cb();
});


gulp.task('default', ['sprites', 'watch', 'styles', 'jade', 'server']);
gulp.task('test', ['jasmine', 'watchTest']);
gulp.task('build', ['sprites', 'styles', 'jade', 'webpack_build']);
