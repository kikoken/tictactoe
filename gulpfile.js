var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename');


gulp.task('styles',()=>{
    gulp
        .src('assets/sass/tictac.sass')
        .pipe(rename('tictac.min.csss'))
        .pipe(gulp.dest('public/css'));
})