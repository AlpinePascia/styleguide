/*  eslint-disable no-console  */
const gulp = require('gulp');
const sass = require('gulp-sass');
const fileinclude = require('gulp-file-include');
const run = require('gulp-run');
const fs = require('fs');
const merge = require('merge-stream');
const util = require('gulp-util');

const _assign = require('lodash/assign');

const docPath = './src/app/docs';
const kssBaseConfig = {
  title: 'Styleguide',
  placeholder: 'logo.svg',
  builder: 'src/app/',
  css: ['kss-assets/css/styleguide.css'],
  js: ['kss-assets/js/kss.js']
};

let config;
try {
  config = require('./config.js');
} catch (e) {
  config = util.env;

  if (!config.theme || !config.vendor) {
    console.log('Provide a minimum configuration as described in the docs');
    process.exit(1);
  }
}

// const theme = config.theme;
const { theme, vendor } = config;
const themeFolder = `../app/design/frontend/${vendor}/${theme}`;
const cssFolder = `${themeFolder}/web/css`;
const destination = config.destination || `../../${theme}-workplace/application/pub/styleguide/`;


gulp.task('kss-config', done => {

  // include the docPath - it's a kss thing
  const source = [`${themeFolder}/web/scss`, docPath];

  // placeholder is an alias for logo - don't ask why :)
  const placeholder = config.placeholder || kssBaseConfig.placeholder;
  const custom = `static/frontend/${vendor}/${theme}/ru_RU`;

  const mergedConfig = _assign(kssBaseConfig, { source, destination, placeholder, custom });

  fs.writeFileSync('kss-config.json', JSON.stringify(mergedConfig, null, 2));
  done();
});


gulp.task('handlebars', () => {
  return gulp.src(['src/app/templates/index.hbs'])
    .pipe(fileinclude({
      prefix: '@@',
    }))
    .pipe(gulp.dest('src/app/'));
});

gulp.task('app-sass', () => {
  return gulp.src('src/app/kss-assets/css/kss.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/app/kss-assets/css/'));
});

gulp.task('copy-styles', () => {
  if (fs.existsSync(`${cssFolder}/styleguide.css`)) {
    return gulp.src(`${cssFolder}/styleguide.css`)
      .pipe(gulp.dest('src/app/kss-assets/css/'));
  } else {
    console.log('No styleguide.css found in the source');
    process.exit(1);
  }
});

gulp.task('copy-assets', () => {
  const fonts = gulp.src(`${themeFolder}/web/fonts/**/*`)
    .pipe(gulp.dest(`${destination}/kss-assets/fonts`));

  const images = gulp.src(`${themeFolder}/web/images/**/*`)
    .pipe(gulp.dest(`${destination}/kss-assets/images`));

  return merge(fonts, images);
});

gulp.task('kss', () => {
  return run('npm run kss').exec();
});

gulp.task('build', gulp.series(
  gulp.parallel(
    'kss-config',
    'app-sass',
    'copy-styles',
    'handlebars',
    'copy-assets'
  ),
  'kss')
);


gulp.task('dev', () => {
  // if (notProduction) {
  //   const bSync = browserSync.create();
  //   bSync.init({
  //     proxy: 'localhost:8081',
  //     serveStatic: [guide_build]
  //   });
  //
  //   gulp.watch(cssFolder, gulp.series('guide-build'));
  //   gulp.watch(`${guide_app}/kss-assets/css/*.scss`, gulp.series('guide-app-sass', 'kss'));
  //   gulp.watch(`${guide_app}/templates/**/*.hbs`, gulp.series('guide-handlebars', 'kss'));
  //
  //   gulp.watch(guide_build).on('change', bSync.reload);
  // }
});


gulp.task('default', done => {
  return gulp.series('build')(done);
});
