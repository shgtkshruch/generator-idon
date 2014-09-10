'use strict'

gulp = require 'gulp'
$ = require('gulp-load-plugins')()
browserSync = require 'browser-sync'

config = 
  src: './src'
  dest: './dist'

gulp.task 'browser-sync', ->
  browserSync
    watchOptions:
      debounceDelay: 0
    server:
      baseDir: config.dest
    notify: false
    reloadDelay: 0

<% if (includeJs) { %> gulp.task 'html', ['jade'],  ->
  assets = $.useref.assets()
  gulp.src config.dest + '/index.html'
    .pipe assets
    .pipe assets.restore()
    .pipe $.useref()
    .pipe gulp.dest config.dest <% } %>

gulp.task 'jade', ->
  gulp.src config.src + '/index.jade'
    .pipe $.plumber()
    .pipe $.jade
      pretty: true
    .pipe gulp.dest config.dest
    .pipe browserSync.reload
      stream: true

gulp.task 'sass', ->
  gulp.src config.src + '/styles/**/*.scss'
    .pipe $.plumber()
    .pipe $.filter '**/style.scss'
    .pipe $.rubySass
      style: 'expanded'
    .pipe $.autoprefixer 'last 2 version', 'ie 9', 'ie 8'
    .pipe gulp.dest config.dest + '/styles'
    .pipe browserSync.reload
      stream: true

gulp.task 'coffee', ->
  gulp.src config.src + '/scripts/*.coffee'
    .pipe $.plumber()
    .pipe $.changed config.dest,
      extension: '.js'
    .pipe $.coffee()
    .pipe gulp.dest config.dest + '/scripts'
    .pipe browserSync.reload
      stream: true

gulp.task 'default', ['build', 'browser-sync'], -> <% if (includeJs) { %>
  gulp.watch config.src + '/index.jade', ['html'] <% } else { %>
  gulp.watch config.src + '/index.jade', ['jade'] <% } %>
  gulp.watch config.src + '/styles/*.scss', ['sass']
  gulp.watch config.src + '/scripts/*.coffee', ['coffee']

<% if (includeJs) { %> gulp.task 'build', ['html', 'sass', 'coffee'] <% } else { %>
gulp.task 'build', ['jade', 'sass', 'coffee'] <% } %>
