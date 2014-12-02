/**
Gulp tasks
=====

Gulp is used on development enviroment to perform automated tasks.

Node modules used:
-----

 - [gulp](https://www.npmjs.org/package/gulp)
 - [gulp-util](https://www.npmjs.org/package/gulp-util)
 - [gulp-plumber](https://www.npmjs.org/package/gulp-plumber)
 - [gulp-scsslint](https://www.npmjs.org/package/gulp-scsslint)
 - [gulp-sass](https://www.npmjs.org/package/gulp-sass)
 - [gulp-autoprefixer](https://www.npmjs.org/package/gulp-autoprefixer)
 - [gulp-minify-css](https://www.npmjs.org/package/gulp-minify-css)
 - [gulp-rename](https://www.npmjs.org/package/gulp-rename)
 - [gulp-add-src](https://www.npmjs.org/package/gulp-add-src)
 - [gulp-jshint](https://www.npmjs.org/package/gulp-jshint)
 - [gulp-uglify](https://www.npmjs.org/package/gulp-uglify)
 - [gulp-concat](https://www.npmjs.org/package/gulp-concat)
 - [gulp-swig](https://www.npmjs.org/package/gulp-swig)
 - [gulp-data](https://www.npmjs.org/package/gulp-data)
 - [path](https://www.npmjs.org/package/path)
 - [gulp-minify-html](https://www.npmjs.org/package/gulp-minify-html)

*/

var gulp = require('gulp'),
    util = require('gulp-util'),
    plumber = require('gulp-plumber'),
    scsslint = require('gulp-scsslint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    addsrc = require('gulp-add-src'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    swig = require('gulp-swig'),
    data = require('gulp-data'),
    path = require('path'),
    minifyhtml = require('gulp-minify-html');


/**
Error handler
-----

The `errorHandler` function prevents Gulp from stop watching when find errors.
*/

function errorHandler(error){
    util.log(util.colors.red('Error'), error.message);
    this.emit('end');
}

/**
Styles task
-----

__Useful Resources__

 - [Sass](http://sass-lang.com/)
 - [Scss Lint](https://github.com/causes/scss-lint)
    - [Scss Lint properties sort orders](https://github.com/causes/scss-lint/blob/master/data/property-sort-orders/concentric.txt)
 - [CSS Lint Rules](https://github.com/CSSLint/csslint/wiki/Rules)

*/

gulp.task('styles', function() {
    gulp.src('./assets/src/styles/main.scss')
        .pipe(plumber({errorHandler: errorHandler}))
        //.pipe(scsslint('.scss-lint.yml'))
        //.pipe(scsslint.reporter())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./assets/dist/css/'));
});

/**
Scripts task
-----

__Useful Resources__

 - [JSHint](http://www.jshint.com/)

*/

gulp.task('scripts', function() {
    gulp.src(['./assets/src/scripts/**/*.js', './modules/**/*.js', '!assets/src/scripts/vendors/**/*.js'])
        .pipe(plumber({errorHandler: errorHandler}))
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('jshint-stylish'))
        .pipe(addsrc('./assets/src/scripts/vendors/**/*.js'))
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('./assets/dist/js/'));
});

/**
Watch task
-----

The Watch task will watch changes on and run other tasks on each save.

*/

gulp.task('watch', function() {
    gulp.watch(['./assets/src/styles/**/*.scss', './modules/**/*.scss'], ['styles']);
    gulp.watch(['./assets/src/scripts/**/*.js', './modules/**/*.js'], ['scripts']);
});


/**
Default task
-----

This allow to perform all tasks only using `gulp` command.

*/
gulp.task('default', ['styles', 'scripts', 'watch']);
