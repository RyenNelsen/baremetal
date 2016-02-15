var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var poststylus = require('poststylus');
var stylint = require('gulp-stylint');
var rimraf = require('gulp-rimraf');
var zip = require('gulp-zip');

var mainStyl = './styl/main.styl';
var flexStyl = './styl/main-flexonly.styl'; // flexbox only grid
var floatStyl = './styl/main-floatonly.styl'; // float only grid

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
        .pipe(stylus({ use: poststylus([ 'autoprefixer' ]) }))
        .pipe(cssnano({ discardComments: false }))
        .pipe(rename('baremetal.min.css'))
        .pipe(gulp.dest('./build/production/both'));
    gulp.src(mainStyl)
        .pipe(stylus({ use: poststylus([ 'autoprefixer' ]) }))
        .pipe(rename('baremetal.css'))
        .pipe(gulp.dest('./build/production/both'));
    // flexbox-only grid system
    gulp.src(flexStyl)
        .pipe(stylus({ use: poststylus([ 'autoprefixer' ]) }))
        .pipe(rename('baremetal.css'))
        .pipe(gulp.dest('./build/production/flex'));
    gulp.src(flexStyl)
        .pipe(stylus({ use: poststylus([ 'autoprefixer' ]) }))
        .pipe(cssnano({ discardComments: false }))
        .pipe(rename('baremetal.min.css'))
        .pipe(gulp.dest('./build/production/flex'));
    // class float-only grid system
    gulp.src(floatStyl)
        .pipe(stylus({ use: poststylus([ 'autoprefixer' ]) }))
        .pipe(rename('baremetal.css'))
        .pipe(gulp.dest('./build/production/float'));
    gulp.src(floatStyl)
        .pipe(stylus({ use: poststylus([ 'autoprefixer' ]) }))
        .pipe(cssnano({ discardComments: false }))
        .pipe(rename('baremetal.min.css'))
        .pipe(gulp.dest('./build/production/float'));
});

gulp.task('clean', function() {
    gulp.src('./build', { read: false })
        .pipe(rimraf());
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

gulp.task('default', ['lint', 'build:dev', 'build:prod'], function() {
    gulp.src('./build/production/both/*')
        .pipe(zip('both-grids.zip'))
        .pipe(gulp.dest('./build/production/zips'));
    gulp.src('./build/production/flex/*')
        .pipe(zip('flex-grid.zip'))
        .pipe(gulp.dest('./build/production/zips'));
    gulp.src('./build/production/float/*')
        .pipe(zip('float-grid.zip'))
        .pipe(gulp.dest('./build/production/zips'));
});
