var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemap = require('gulp-sorucemaps'),
    rename = require('gulp-rename');


gulp.task('styles',()=>{
    gulp
        .src('assets/sass/tictac.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error',sass.logError))
        .pipe(rename('tictac.min.csss'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'));
})