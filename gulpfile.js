var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    extend = require('extend'),
    parseArgs   = require('minimist'),
    del = require('del');

paths = {
    sass: ['./client/stylesheets/sass/weatherweb.scss']
};

var appRoot = "./dist";

// Configuration
//
var config = extend({
    env: process.env.NODE_ENV
}, parseArgs(process.argv.slice(2)));

// Getters / Setters
//
gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = config.env = 'development';
});
gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = config.env = 'production';
});

gulp.task('clean', function() {
    //return del(['dist/client']);
});

gulp.task('sass', function () {
    return sass(paths.sass)
        .pipe(gulp.dest(appRoot+'/client/stylesheets/sass'));
});

gulp.task('static', function () {
    gulp.src(['./client/images/**'])
        .pipe(gulp.dest(appRoot+'/client/img'));
    gulp.src(['./client/components/**/*.html'])
        .pipe(gulp.dest(appRoot+'/client/components'));
    gulp.src(['./client/home/**/*.html'])
        .pipe(gulp.dest(appRoot+'/client/home'));
    gulp.src(['./client/**/*.ico'])
        .pipe(gulp.dest(appRoot+'/client'));
    gulp.src(['./client/lib/**/*.min.css'])
        .pipe(gulp.dest(appRoot+'/client/lib'));
});

gulp.task('js', function() {
    gulp.src('./client/lib/**/*.js')
        .pipe(gulp.dest(appRoot+'/client/lib'));
    gulp.src(['./client/home/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest(appRoot+'/client/home'));
    gulp.src(['./client/components/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest(appRoot+'/client/components'));
    gulp.src(['./client/users/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest(appRoot+'/client/users'));
    //gulp.src(['./config/**/*.js'])
    //    .pipe(uglify())
    //    .pipe(gulp.dest(appRoot+'/config'));
    gulp.src(['./client/application.js'])
        .pipe(uglify())
        .pipe(gulp.dest(appRoot+'/client'));
});

//server side JS
gulp.task('server', function() {
    // create 1 vendor.js file from all vendor plugin code
    gulp.src(['app.js', 'package.json', 'bower.json', '.bowerrc'])
        .pipe(gulp.dest(appRoot));
    gulp.src(['./app/**'])
        .pipe(gulp.dest(appRoot+'/app'));

});

gulp.task('develop', ['set-dev-node-env' ,'sass', 'static', 'js', 'server'], function() {

});
gulp.task('deploy', ['set-prod-node-env', 'clean', 'sass', 'static', 'js', 'server'], function() {

});

//gulp.task('default', ['sass', 'static', 'js', 'server']);
