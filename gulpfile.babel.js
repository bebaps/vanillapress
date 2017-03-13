'use strict';

/**
 * Define the paths to be used
 * @type {function}
 */
const PATHS = new function() {
  this.dist = './dist',
  this.src = './src',
  this.css = `${this.dist}/css`,
  this.js = `${this.dist}/js`,
  this.es6 = `${this.src}/es6`,
  this.scss = `${this.src}/scss`;
};

/**
 * Define the sources to be used
 * @type {Object}
 */
const SOURCES = {
  css: [
    `${PATHS.css}/*.css`,
    `!${PATHS.css}/*.min.css`
  ],
  scss: [
    `${PATHS.scss}/**/*.scss`
  ],
  js: [
    `${PATHS.js}/**/*.js`
  ],
  es6: [
    `${PATHS.es6}/**/*.js`
  ],
  concat: [ // Set the order for JS concatenation
    `${PATHS.es6}/data.js`,
    `${PATHS.es6}/helpers.js`,
    `${PATHS.es6}/model.js`,
    `${PATHS.es6}/router.js`,
    `${PATHS.es6}/view.js`,
    `${PATHS.es6}/editor.js`,
    `${PATHS.es6}/app.js`
  ]
};

/**
 * Set options for the Gulp plugins
 * @type {Object}
 */
const OPTIONS = {
  autoprefixer: {
    browsers: ['> 1%', 'last 2 versions']
  },
  browsersync: {
    server: true,
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: false
    },
    browser: [
      'google chrome'
    ],
    reloadOnRestart: true,
    injectChanges: true
  },
  cssnano: {
    autoprefixer: false,
    calc: {
      mediaQueries: true
    },
    colormin: false,
    convertValues: {
      precision: 0
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    svgo: {
      encode: true
    },
    zindex: false
  },
  loadplugins: {
    lazy: true
  },
  stylelint: {
    reporters: [{
      formatter: 'string',
      console: true
    }]
  }
};

/**
 * Include gulp and plugins not targeted by gulp-load-plugins
 */
import gulp from 'gulp';
import del from 'del';
import postscss from 'postcss-scss';
import reporter from 'postcss-reporter';

const BROWSERSYNC = require('browser-sync').create();
const $ = require('gulp-load-plugins')(OPTIONS.loadplugins);

// Utility Tasks
// -----------------------------------------------------------------------------
/**
 * Delete compiled CSS files and sourcemap(s)
 */
gulp.task('clean:css', () => {
  del(`${PATHS.css}/*.css`);
});

/**
 * Delete compiled JS files and sourcemap(s)
 */
gulp.task('clean:js', () => {
  del(`${PATHS.js}/*.js`);
});

// Server Tasks
// -----------------------------------------------------------------------------
/**
 * Start a server
 */
gulp.task('server', () => {
  BROWSERSYNC.init(OPTIONS.browsersync);
});

// Sass Tasks
// -----------------------------------------------------------------------------
/**
 * Lint Sass via Stylelint
 */
gulp.task('scss:lint', () => {
  return gulp
  .src(SOURCES.scss)
  .pipe($.plumber())
  .pipe($.stylelint(OPTIONS.stylelint));
});

/**
 * Compile and minify Sass, then create a sourcemap
 */
gulp.task('scss', ['clean:css'], () => {
  return gulp
  .src(SOURCES.scss)
  .pipe($.sourcemaps.init())
  .pipe($.plumber())
  .pipe($.sass()
    .on('error', $.sass.logError))
  .on('error', $.notify.onError('Error compiling Sass!'))
  .pipe($.autoprefixer(OPTIONS.autoprefixer))
  .pipe($.cssnano(OPTIONS.cssnano))
  .pipe($.rename({
    suffix: '.min'
  }))
  .pipe($.sourcemaps.write('/'))
  .pipe($.plumber.stop())
  .pipe(gulp.dest(PATHS.css))
  .pipe(BROWSERSYNC.stream());
});

// JS Tasks
// -----------------------------------------------------------------------------
/**
 * Lint JS via ESLint
 */
gulp.task('js:lint', () => {
  return gulp
  .src(SOURCES.es6)
  .pipe($.plumber())
  .pipe($.babel())
  .pipe($.eslint())
  .pipe($.eslint.format())
  .pipe($.eslint.failAfterError());
});

/**
 * Compile from ES2015
 */
gulp.task('babel', () => {
  return gulp
  .src(SOURCES.es6)
  .pipe($.babel())
  .pipe(gulp.dest(`${PATHS.js}/ES2015`));
});

/**
 * Concatenate and minify JS, then create a sourcemap
 */
gulp.task('js', ['clean:js'], () => {
  return gulp
  .src(SOURCES.concat)
  .pipe($.sourcemaps.init())
  .pipe($.plumber())
  .pipe($.babel())
  .pipe($.concat('main.js'))
  .pipe($.uglify())
  .pipe($.rename({
    suffix: '.min'
  }))
  .pipe($.sourcemaps.write('/'))
  .pipe($.plumber.stop())
  .pipe(gulp.dest(PATHS.js))
  .pipe(BROWSERSYNC.stream());
});

// Defaults
// -----------------------------------------------------------------------------
/**
 * Watch files for changes
 */
gulp.task('watch', () => {
  gulp.watch(SOURCES.scss, ['scss']);
  gulp.watch(SOURCES.js, ['js']);
});

/**
 * Default task
 */
gulp.task('default', ['server', 'watch']);
