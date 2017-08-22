var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    browsersync = require('browser-sync'),
    buffer = require('vinyl-buffer'),
    babel = require('babelify'), 
    source = require('vinyl-source-stream'), 
    rename = require('gulp-rename');

var $ = require('gulp-load-plugins')({lazy: true})


/**
 * @desc tasklist
 */
gulp.task('help', $.taskListing);

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


/**
 * Start to browser-sync
 * @param {boolean} isDev
 */
function startBrowserSync() {
    if (browsersync.active)
        return;

    log('Starting browsersync on port ' + port);

    gulp.watch([config.styl], ['styles'])
        .on('change', function(event) {         changeEvent(event); 
        });


    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            config.src + '**/*.*',
            '!' + config.styl,
            config.temp + '/**/*.css'
        ] : [

        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    };

    browsersync(options);

}

/**
 * Display log message in console
 * @param {string} msg 
 */
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item))
                $.util.log($.util.colors.blue(msg[item]));
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
