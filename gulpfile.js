const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const imagemin = require('gulp-imagemin');

gulp.task('styles', () => {
    return gulp.src('scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

gulp.task('clean', () => {
    return del([
        'css/custom-styles.css',
    ]);
});

gulp.task('imgmin', () => {
    return gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./minified/images'));
})

gulp.task('watch', () => {
    gulp.watch('scss/*.scss', (done) => {
        gulp.series(['clean', 'styles'])(done);
    });
});