const gulp = require('gulp');
const sass = require('gulp-sass');
const fileinclude = require('gulp-file-include');
const run = require('gulp-run');
const fs = require('fs');
const merge = require('merge-stream');

const _pick = require('lodash/pick');
const _assign = require('lodash/assign');
const _mapKeys = require('lodash/mapKeys');

const config = require('./config.js');
const themeFolder = config.themeFolder;
const destination = config.destination;
const cssFolder = `${themeFolder}/web/css`;

const kssBaseConfig = {
  title: 'Styleguide',
  placeholder: '',
  builder: 'src/app/',
  css: [
    'kss-assets/css/styleguide.css'
  ],
  js: [
    'kss-assets/js/kss.js'
  ]
};


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
  return gulp.src(`${cssFolder}/styleguide.css`)
    .pipe(gulp.dest('src/app/kss-assets/css/'));
});

gulp.task('copy-assets', () => {
  const fonts = gulp.src(`${themeFolder}/web/fonts/**/*`)
    .pipe(gulp.dest(`${destination}/kss-assets/fonts`));

  const images = gulp.src(`${themeFolder}/web/images/**/*`)
    .pipe(gulp.dest(`${destination}/kss-assets/images`));

  return merge(fonts, images);
});

gulp.task('kss-config', done => {
  const kssProps = ['title', 'source', 'destination', 'staticUrl', 'placeholder'];
  const fromConfig = _pick(config, kssProps);
  const mergedConfig = _assign(kssBaseConfig, fromConfig);
  const kssConfig = _mapKeys(mergedConfig, (value, key) => {
    return key === 'staticUrl' ? 'custom' : key;
  });

  fs.writeFileSync('kss-config.json', JSON.stringify(kssConfig));
  done();
});

gulp.task('kss', () => {
  return run('npm run kss').exec();
});

gulp.task('build', gulp.series(
  gulp.parallel(
    'app-sass',
    'copy-styles',
    'handlebars',
    'kss-config',
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
