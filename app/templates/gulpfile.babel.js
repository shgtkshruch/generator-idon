import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import autoprefixer from 'autoprefixer';
import sorting from 'postcss-sorting';
import mqpacker from 'css-mqpacker';
import stylefmt from 'stylefmt';
import del from 'del';
import ghpages from 'gh-pages';
import path from 'path';

const $ = gulpLoadPlugins();
const bs = browserSync.create();

const config = {
  src: 'src',
  dest: 'dist'
};

gulp.task('browserSync', () => {
  bs.init({
    server: {
      baseDir: config.dest,
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    notify: false,
    browser: 'Google Chrome Canary'
  });
});

gulp.task('html', ['pug', 'sass', 'js'], () => {
  return gulp.src(config.dest + '/index.html')
    .pipe($.useref())
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe($.if('*.css', $.cleanCss()))
    .pipe($.if('*.js', $.uglify()))
    .pipe(gulp.dest(config.dest));
});

gulp.task('pug', () => {
  return gulp.src(config.src + '/**/*.pug')
    .pipe($.plumber())
    .pipe($.changed(config.dest, {
      extension: '.html'
    }))
    .pipe($.pug({
      pretty: true
    }))
    .pipe($.prettify({
      condense: true,
      padcomments: false,
      indent: 2,
      indent_char: ' ',
      indent_inner_html: 'false',
      brace_style: 'expand',
      wrap_line_length: 0,
      preserve_newlines: true
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(bs.stream());
});

gulp.task('sass', () => {
  return gulp.src(config.src + '/styles/main.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss([
      autoprefixer({browers: ['last 2 version', 'ie9', 'ie8']}),
      sorting({'sort-order': 'yandex'}),
      mqpacker,
      stylefmt
    ]))
    .pipe(gulp.dest(config.dest + '/styles'))
    .pipe(bs.stream());
});

gulp.task('js', () => {
  return gulp.src(config.src + '/scripts/*.js')
    .pipe($.plumber())
    .pipe($.changed(config.dest, {
      extension: '.js'
    }))
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(config.dest + '/scripts'))
    .pipe(bs.stream());
});

gulp.task('image', () => {
  return gulp.src(config.src + '/images/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(config.dest + '/images'));
});

gulp.task('publish', ['build'], () => {
  return ghpages.publish(path.join(__dirname, config.dest));
});

gulp.task('default', ['pug', 'sass', 'js', 'image', 'browserSync'], () => {
  gulp.watch(config.src + '/**/*.pug', ['pug']);
  gulp.watch(config.src + '/styles/*.scss', ['sass']);
  gulp.watch(config.src + '/scripts/*.js', ['js']);
  gulp.watch(config.src + '/images/*', ['image']);
});

gulp.task('build', ['html', 'image'], () => {
  return del([
    'dist/partials',
    'dist/styles/*.css',
    'dist/scripts/*.js',
    '!dist/styles/{main, vendor}.css',
    '!dist/scripts/{main, vendor}.js'
  ]);
});

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';<% if (useBower) { %>
import {stream as wiredep}from 'wiredep';<% } %>
import autoprefixer from 'autoprefixer';
import sorting from 'postcss-sorting';
import mqpacker from 'css-mqpacker';
import stylefmt from 'stylefmt';
import del from 'del';
import ghpages from 'gh-pages';
import path from 'path';

const $ = gulpLoadPlugins();
const bs = browserSync.create();

const config = {
  src: 'src',
  dest: 'dist'
};

gulp.task('browserSync', () => {
  bs.init({
    server: {
      baseDir: config.dest,
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    notify: false,
    browser: 'Google Chrome Canary'
  });
});
<% if (useBower) { %>
gulp.task('wiredep', () => {
  return gulp.src(config.src + '/index.jade')
    .pipe(wiredep())
    .pipe(gulp.dest(config.src));
});
<% } %>
gulp.task('html', ['pug', 'sass', 'js'], () => {
  return gulp.src(config.dest + '/index.html')
    .pipe($.useref())
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cleanCss()))
    .pipe(gulp.dest(config.dest));
});

gulp.task('pug', () => {
  return gulp.src(config.src + '/**/*.pug')
    .pipe($.plumber())
    .pipe($.changed(config.dest, {
      extension: '.html'
    }))
    .pipe($.pug({
      pretty: true
    }))
    .pipe($.prettify({
      condense: true,
      padcomments: false,
      indent: 2,
      indent_char: ' ',
      indent_inner_html: 'false',
      brace_style: 'expand',
      wrap_line_length: 0,
      preserve_newlines: true
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(bs.stream());
});

gulp.task('sass', () => {
  return gulp.src(config.src + '/styles/style.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss([
      autoprefixer({browers: ['last 2 version', 'ie9', 'ie8']}),
      sorting({'sort-order': 'yandex'}),
      mqpacker,
      stylefmt
    ]))
    .pipe(gulp.dest(config.dest + '/styles'))
    .pipe(bs.stream());
});

gulp.task('js', () => {
  return gulp.src(config.src + '/scripts/*.js')
    .pipe($.plumber())
    .pipe($.changed(config.dest, {
      extension: '.js'
    }))
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(config.dest + '/scripts'))
    .pipe(bs.stream());
});

gulp.task('image', () => {
  return gulp.src(config.src + '/images/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(config.dest + '/images'));
});

gulp.task('publish', ['build'], () => {
  return ghpages.publish(path.join(__dirname, config.dest));
});

gulp.task('default', ['pug', 'sass', 'js', 'image', 'browserSync'], () => {
  gulp.watch(config.src + '/**/*.pug', ['pug']);
  gulp.watch(config.src + '/styles/*.scss', ['sass']);
  gulp.watch(config.src + '/scripts/*.js', ['js']);
  gulp.watch(config.src + '/images/*', ['image']);
});

gulp.task('build', ['html', 'image'], () => {
  return del([
    'dist/partials',
    'dist/styles/*.css',
    'dist/scripts/*.js',
    '!dist/styles/{main, vendor}.css',
    '!dist/scripts/{main, vendor}.js'
  ]);
});
