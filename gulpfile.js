var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    babel = require('babelify'), 
    source = require('vinyl-source-stream'), 
    rename = require('gulp-rename');


gulp.task('styles',()=>{
    gulp
        .src('assets/sass/tictac.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error',sass.logError))
        .pipe(rename('tictac.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'));
})


gulp.task('scripts',() => {
    browserify('./src/tictac.js')
        .transform(babel)
        .bundle()
        .pipe(source('tictac.js'))
        .pipe(rename('tictac.min.js'))
        .pipe(gulp.dest('public'));
})

gulp.task('default',['styles','scripts'],() => {
    gulp.watch('./src/tictac.js',['scripts']);
    gulp.watch('./assets/sass/tictac.sass',['styles']);
});
