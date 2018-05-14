//Gulpfile.js
//BackOffice front-end development taskrunner
//See Readme.md for more info

//get all your task dependencies first
var gulp = require('gulp');
var babel = require("gulp-babel");
var rename = require("gulp-rename");
var packageJSON = require('./package');
var taskListing = require('gulp-task-listing');

var rollup = require('rollup');
var alias = require('rollup-plugin-alias');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');

//set configuration
var config = {
  es6: [
	'**/*.es.js',
	"!node_modules/**/*.es.js"
	]
};
//set babel options
var babelConfig = packageJSON.babelConfig;

//compile the .es files to .js (ES5)
gulp.task('build', ['bundle'], function () {
return gulp
  .src(config.es6, { base: './' })          // get all files in config
  .pipe(babel(babelConfig))                    // compile ES6 to ES5
  .pipe(rename(function (path) {               // remove '.es6' from the file name
	path.basename = path.basename.replace(".es", "");
	return path;
  }))
  .pipe(gulp.dest("./dist/"))                // write the ES5 file
});

gulp.task('bundle', function () {
    return rollup.rollup({
      input: 'frosting.es.js',
      plugins: [
        resolve(),
        commonjs(),
        alias({
          'tinycolor2': 'node_modules/tinycolor2/tinycolor.js',
        })
      ]
    }).then(bundle => {
      return bundle.write({
        file: './frosting-bundle.es.js',
        format: 'umd',
        name: 'frosting'
      });
    });
  });


// The default task (called when you run `gulp` from cmd)
gulp.task('default', taskListing);
