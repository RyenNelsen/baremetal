var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var poststylus = require('poststylus');
var stylint = require('gulp-stylint');

var mainStyl = './styl/main.styl';

gulp.task('build:dev', function() {
    gulp.src(mainStyl)
        .pipe(sourcemaps.init())
        .pipe(stylus({ use: poststylus([ 'autoprefixer' ]) }))
        .pipe(sourcemaps.write())
        .pipe(rename('baremetal.css'))
        .pipe(gulp.dest('./build/development'));
});

gulp.task('build:prod', function() {
    gulp.src(mainStyl)
        .pipe(stylus())
        .pipe(cssnano({ discardComments: false }))
        .pipe(rename('baremetal.min.css'))
        .pipe(gulp.dest('./build/production'));
    gulp.src(mainStyl)
        .pipe(stylus({ use: poststylus([ 'autoprefixer' ]) }))
        .pipe(rename('baremetal.css'))
        .pipe(gulp.dest('./build/production'));
});

gulp.task('lint', function() {
    return gulp.src('./styl/**/*.styl')
        .pipe(stylint())
        .pipe(stylint.reporter());
});

gulp.task('stylus:watch', function() {
    gulp.watch('./styl/**/*.styl', ['lint', 'build:dev']);
});

gulp.task('watch', ['build:dev', 'stylus:watch']);

gulp.task('default', ['lint', 'build:dev', 'build:prod']);
