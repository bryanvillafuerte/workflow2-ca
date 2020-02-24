const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sass = require('gulp-sass');
const del = require('del');
const imagemin = require('gulp-imagemin');

// This gulp task will compile sass files into css
gulp.task('styles', () => {
    return gulp.src('scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

// This gulp task will delete the compiled css before replacing with a new one
gulp.task('clean', () => {
    return del([
        'css/custom-styles.css',
    ]);
});

// This gulp task will minify image files
gulp.task('imgmin', () => {
    return gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./minified/images'));
})

// This gulp task will watch file changes and reload the browser after changes
gulp.task('default', () => {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('*.html').on('change', reload);

    gulp.watch('scss/*.scss', (done) => {
        gulp.series(['clean', 'styles'])(done, reload);
    });
});