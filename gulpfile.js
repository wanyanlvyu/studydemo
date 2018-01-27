/*
 * @Author: zhengwei
 * @Date:   2016-11-04 15:55:04
 * @Last Modified by:   username
 * @Last Modified time: 2017-02-14 19:25:29
 */

'use strict';
/**
 * 1. LESS 编译 压缩 合并
 * 2. JS合并 压缩  混淆
 * 3. img复制
 * 4. html压缩
 */

// 在gulpfile 中先载入gulp包 因为这个包提供了一些API

var gulp = require("gulp");
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//1. LESS 编译 压缩 合并

gulp.task('style', function() {
    //这里是在执行style任务 时自动执行
    gulp.src(['less/*.less', '!less/_*.less'])
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }))
});
// 2. JS合并 压缩  混淆
gulp.task('script', function() {
    gulp.src('js/*.js')
        .pipe(uglify().on('error', function(e) {
            console.log(e);
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({ stream: true }))
});
// 3. img复制
gulp.task('image', function() {
    gulp.src('images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({ stream: true }))
});
// 6. node_modules复制
gulp.task('node_modules', function() {
    gulp.src('node_modules/*/*.*')
        .pipe(gulp.dest('dist/node_modules'))
        .pipe(browserSync.reload({ stream: true }))
});
// 6. lib复制
gulp.task('lib', function() {
    gulp.src('lib/*/*.*')
        .pipe(gulp.dest('dist/lib'))
        .pipe(browserSync.reload({ stream: true }))
});
// 7. assets复制
gulp.task('assets', function() {
    gulp.src('assets/*/*.*')
        .pipe(gulp.dest('dist/assets'))
        .pipe(browserSync.reload({ stream: true }))
});
var htmlmin = require('gulp-htmlmin');
// 4. html压缩
gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({ stream: true }))
});
// 5. tmps压缩
gulp.task('tmps', function() {
    gulp.src('tmps/*.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist/tmps/'))
        .pipe(browserSync.reload({ stream: true }))
});
var browserSync = require('browser-sync');
//启动一个服务
gulp.task('server', function() {
    browserSync({ server: { "baseDir": ['dist/'] } },
        function(err, bs) {
            console.log(bs.options.getIn(["urls", "local"]));
        });
    gulp.watch('less/*.less', ['style']);
    gulp.watch('js/*.js', ['script']);
    gulp.watch('images/*.*', ['image']);
    gulp.watch('*.html', ['html']);
})

gulp.task('default', ['style', 'script', 'image', 'node_modules','lib', 'html','tmps','assets', 'server']);
