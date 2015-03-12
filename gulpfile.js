var gulp = require('gulp'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect');

gulp.task('jade', function(){
    gulp.src(['./assets/template/*.jade', '!./assets/template/_*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .on('error', console.log)
        .pipe(gulp.dest('./public/'))
        .pipe(connect.reload());
});

gulp.task('stylus', function(){
    gulp.src('./assets/stylus/style.styl')
        .pipe(stylus({
            compress: true
        }))
        .on('error', console.log)
        .pipe(gulp.dest('./public/css'))
        .pipe(connect.reload());
});

gulp.task('js', function(){
    gulp.src(['./assets/js/**/*.js', '!./assets/js/vendor/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(uglify('app.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(connect.reload());
});

gulp.task('images', function(){
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img'))
        .pipe(connect.reload());
});

gulp.task('watch', function(){
    gulp.watch(['./assets/template/*.jade'], ['jade']);
    gulp.watch(['./assets/stylus/style.styl'], ['stylus']);
    gulp.watch(['./assets/js/**/*.js'], ['js']);
    gulp.watch(['./assets/img/**/*'], ['images']);
});

gulp.task('connect', function(){
   connect.server({
       root: 'public',
       livereload: true
   });
});

gulp.task('default', ['jade', 'stylus', 'js', 'images', 'watch', 'connect']);