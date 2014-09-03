'use strict';

gulp = require 'gulp'
$ = require('gulp-load-plugins')()
browserSync = require 'browser-sync'

config = 
  src: './src'
  dest: './dest'

gulp.task 'browser-sync', ->
  browserSync
    files: config.src + '/*'
    notify: false

gulp.task 'bs-reload', ->
  browserSync.reload()

gulp.task 'sass', ->
  gulp.src config.src + '/styles/**/*.scss'
    .pipe $.plumber()
    .pipe $.filter '**/style.scss'
    .pipe $.rubySass
      style: 'expanded'
      bundleExec: true
    .pipe $.autoprefixer 'last 2 version', 'ie 8', 'ie 7'
    .pipe gulp.dest config.theme
    .pipe browserSync.reload
      stream: true

gulp.task 'coffee', ->
  gulp.src config.src + '/scripts/*.coffee'
    .pipe $.plumber()
    .pipe $.changed config.theme,
      extension: '.js'
    .pipe $.coffee()
    .pipe gulp.dest config.theme

gulp.task 'default', ['browser-sync'], ->
  gulp.watch config.src + '/**/*', ['bs-reload']
  gulp.watch config.src + '/styles/*.scss', ['sass', 'bs-reload']
  gulp.watch config.src + '/scripts/*.coffee', ['coffee', 'bs-reload']

gulp.task 'build', ['sass', 'coffee']

