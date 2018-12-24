'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const webp = require('gulp-webp');
const del = require('del');


gulp.task('img', () =>
    gulp.src('src/*')
    .pipe(imagemin([
            pngquant({
                quality: '70-90',
                speed: 1,
                floyd: 1}),
            mozjpeg({
                progressive: true})
            ],
            {verbose: true}))
    .pipe(gulp.dest('build'))
);

gulp.task('webp', () =>
    gulp.src('src/*')
    .pipe(webp({
        quality: 75,
        preset: 'photo',
        method: 6
    }))
    .pipe(gulp.dest('build/webp'))
);

gulp.task('clean', () => 
  del('build/*')
);

gulp.task('build', gulp.parallel('img', 'webp'));

gulp.task('default', gulp.series('clean', gulp.parallel('clean','build')));