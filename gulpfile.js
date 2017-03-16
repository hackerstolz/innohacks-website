'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    runSequence = require('run-sequence');

gulp.task('scss', () =>
    gulp.src('css/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('css'))
);

gulp.task('watch', ['browser-sync-init', 'scss'], () =>
    watch('css/*.scss', () => runSequence('scss'))
);

gulp.task('browser-sync-init', done => {
    browserSync.init({
        ghostMode: false,
        files: [
            '*.html',
            'css/*.css'
        ],
        open: true,
        server: {
            baseDir: './',
            middleware: {}
        },
        port: 8080
    }, done);
});

gulp.task('default', ['scss']);
