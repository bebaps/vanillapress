'use strict';

// Define the paths to be used
const PATHS = new function() {
  this.dist = './_dist/',
  this.assets = './assets',
  this.css = `${this.assets}/css`,
  this.js = `${this.assets}/js`,
  this.babel = `${this.assets}/babel`,
  this.images = `${this.assets}/images`,
  this.sass = `${this.assets}/scss`;
};

// Define the sources to be used
const SOURCES = {
  css: [
    `${PATHS.css}/*.css`,
    `!${PATHS.css}/*.min.css`
  ],
  sass: [
    `${PATHS.sass}/**/*.scss`
  ],
  js: [
    `${PATHS.js}/**/*.js`
  ],
  babel: [
    `${PATHS.babel}/**/*.js`
  ],
  images: [
    `${PATHS.images}/**/*.{jpg,png,gif,svg}`
  ],
  concat: [ // Set the order for JS concatenation
    `${PATHS.js}/es6/data.js`,
    `${PATHS.js}/es6/helpers.js`,
    `${PATHS.js}/es6/model.js`,
    `${PATHS.js}/es6/router.js`,
    `${PATHS.js}/es6/view.js`,
    `${PATHS.js}/es6/app.js`
  ]
};

// Set options for the Gulp plugins
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
  imagemin: {
    interlaced: true,
    progressive: true
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

// Include gulp and plugins not targeted by gulp-load-plugins
import gulp from 'gulp';
import del from 'del';
import postscss from 'postcss-scss';
import reporter from 'postcss-reporter';

const BROWSERSYNC = require('browser-sync').create();
const $ = require('gulp-load-plugins')(OPTIONS.loadplugins);

// Utility Tasks
// -----------------------------------------------------------------------------
// Delete compiled CSS files and sourcemap(s)
gulp.task('clean:css', () => {
  del([
    `${PATHS.css}/*.css`,
    `${PATHS.css}/sourcemaps`
  ]);
});

// Delete compiled JS files and sourcemap(s)
gulp.task('clean:js', () => {
  del([
    `${PATHS.js}/*.js`,
    `${PATHS.js}/sourcemaps`
  ]);
});

// Delete the distribution folder
gulp.task('clean:dist', () => {
  del(`${PATHS.dist}`);
});

// Server Tasks
// -----------------------------------------------------------------------------
// Launch a development server
gulp.task('server', ['sass', 'js'], () => {
  if (!BROWSERSYNC.active) {
    BROWSERSYNC.init(OPTIONS.browsersync);
  }
});

// Sass Tasks
// -----------------------------------------------------------------------------
// Lint Sass via Stylelint
gulp.task('sass:lint', () => {
  return gulp
    .src(SOURCES.sass)
    .pipe($.plumber())
    .pipe($.stylelint(OPTIONS.stylelint));
});

// Compile and minify Sass, then create a sourcemap
gulp.task('sass', ['clean:css'], () => {
  return gulp
    .src(SOURCES.sass)
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
    .pipe($.sourcemaps.write('/sourcemaps'))
    .pipe($.plumber.stop())
    .pipe(gulp.dest(PATHS.css))
    .pipe(BROWSERSYNC.stream());
});

// JS Tasks
// -----------------------------------------------------------------------------
// Lint JS via ESLint
gulp.task('js:lint', () => {
  return gulp
    .src('./assets/js/theme/*.js')
    .pipe($.plumber())
    .pipe($.babel())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

// Compile from Babel
gulp.task('babel', () => {
  return gulp.src(SOURCES.babel)
    .pipe($.babel())
    .pipe(gulp.dest(`${PATHS.js}/es6`));
});

// Concatenate and minify JS, then create a sourcemap
gulp.task('js', ['clean:js', 'babel'], () => {
  return gulp
    .src(SOURCES.concat)
    .pipe($.sourcemaps.init())
    .pipe($.plumber())
    .pipe($.print())
    .pipe($.concat('main.js'))
    .pipe($.uglify())
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.sourcemaps.write('/sourcemaps'))
    .pipe($.plumber.stop())
    .pipe(gulp.dest(PATHS.js))
    .pipe(BROWSERSYNC.stream());
});

// Image Tasks
// -----------------------------------------------------------------------------
// Optimize images via Imagemin, best to do this only once
gulp.task('images', () => {
  return gulp
    .src(SOURCES.images)
    .pipe($.plumber())
    .pipe($.imagemin(OPTIONS.imagemin))
    .pipe($.print())
    .pipe(gulp.dest(PATHS.images));
});

// Defaults
// -----------------------------------------------------------------------------
// Watch files for changes
gulp.task('watch', () => {
  gulp.watch(SOURCES.sass, ['sass']);
  gulp.watch(SOURCES.js, ['js']);
  gulp.watch(SOURCES.php, BROWSERSYNC.reload);
});

// Default task
gulp.task('default', ['server', 'watch']);
