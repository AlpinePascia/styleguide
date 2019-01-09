const notProduction = process.env.NODE_ENV !== 'production';

const gulp = require('gulp');
const sass = require('gulp-sass');
const fileinclude = require('gulp-file-include');
const run = require('gulp-run');
const exec = require('child_process').exec;
const fs = require('fs');

// if (notProduction) {
//   var browserSync = require('browser-sync');
// }

// const theme_folder = './app/design/frontend/Mygento/nespresso';
// const scss_folder = `${theme_folder}/web/scss`;
// const css_folder = `${theme_folder}/web/css`;

const guide_folder = 'styleguide';
const guide_app = `${guide_folder}/src/app`;
const guide_build = `${guide_folder}/build`;
const styleguideRepo = 'https://github.com/AlpinePascia/styleguide.git';


// Styleguide
gulp.task('guide-handlebars', () => {
  return gulp.src([`${guide_app}/templates/index.hbs`])
    .pipe(fileinclude({
      prefix: '@@',
    }))
    .pipe(gulp.dest(guide_app));
});

gulp.task('guide-app-sass', () => {
  return gulp.src(`${guide_app}/kss-assets/css/kss.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${guide_app}/kss-assets/css/`));
});

// gulp.task('guide-copy-styles', () => {
//   return gulp.src(`${css_folder}/styleguide.css`)
//     .pipe(gulp.dest(`${guide_app}/kss-assets/css/`));
// });


gulp.task('kss', () => {
  return run('npm run kss').exec();
});

gulp.task('guide-build', gulp.series(gulp.parallel('guide-app-sass', 'guide-copy-styles', 'guide-handlebars'), 'kss'));

gulp.task('guide-clone', () => {
  return exec(`git clone ${styleguideRepo}`);
});

gulp.task('guide-sync', () => {
  // if (notProduction) {
  //   const bSync = browserSync.create();
  //   bSync.init({
  //     proxy: 'localhost:8081',
  //     serveStatic: [guide_build]
  //   });
  //
  //   gulp.watch(css_folder, gulp.series('guide-build'));
  //   gulp.watch(`${guide_app}/kss-assets/css/*.scss`, gulp.series('guide-app-sass', 'kss'));
  //   gulp.watch(`${guide_app}/templates/**/*.hbs`, gulp.series('guide-handlebars', 'kss'));
  //
  //   gulp.watch(guide_build).on('change', bSync.reload);
  // }
});

const pub_folder = './pub';
gulp.task('guide-copy-to-serve', () => {
  return gulp.src(`${guide_build}/**/*`)
    .pipe(gulp.dest(`${pub_folder}/styleguide`));
});

gulp.task('guide', cb => {
  // if (!fs.existsSync(guide_folder)) {
  //   return gulp.series('guide-clone', 'guide-build', 'guide-sync')(cb);
  // }
  return gulp.series('guide-build', 'guide-sync')(cb);
});
