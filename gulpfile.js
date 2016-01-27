var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var nib = require('nib');

var mainStyl = './styl/main.styl';

gulp.task('build:dev', function() {
    gulp.src(mainStyl)
        .pipe(sourcemaps.init())
        .pipe(stylus({ use: nib() }))
        .pipe(sourcemaps.write())
        .pipe(rename('baremetal.css'))
        .pipe(gulp.dest('./build/development'));
});

gulp.task('build:prod', function() {
    gulp.src(mainStyl)
        .pipe(stylus({ compress: true, use: nib() }))
        .pipe(rename('baremetal.min.css'))
        .pipe(gulp.dest('./build/production'));
    gulp.src(mainStyl)
        .pipe(stylus({ use: nib() }))
        .pipe(rename('baremetal.css'))
        .pipe(gulp.dest('./build/production'));
});

gulp.task('stylus:watch', function() {
    gulp.watch('./styl/**/*.styl', ['build:dev']);
});

gulp.task('watch', ['build:dev', 'stylus:watch']);

gulp.task('default', ['build:dev', 'build:prod']);