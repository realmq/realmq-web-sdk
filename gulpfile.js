const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const umd = require('gulp-umd');
const {version} = require('./package');

gulp.task('build', () => {
  return gulp
    .src(['node_modules/paho-mqtt/paho-mqtt.js', 'lib/**/*.js'])
    .pipe(concat(`realmq-${version}.js`))
    .pipe(
      umd({
        exports: () => 'RealMQ',
        namespace: () => 'RealMQ',
      })
    )
    .pipe(gulp.dest('dist'))
    .pipe(rename(`realmq-${version}.min.js`))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
