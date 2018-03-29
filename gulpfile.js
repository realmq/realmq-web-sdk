const gulp = require('gulp');
const concat = require('gulp-concat');
const umd = require('gulp-umd');
const {version} = require('./package');

gulp.task('build', () => {
  return gulp
    .src(['node_modules/paho-mqtt/paho-mqtt.js', 'lib/**/*.js'])
    .pipe(concat(`realmq-${version}.js`))
    .pipe(
      umd({
        templateName: 'amdWeb',
        exports: () => 'RealMQ',
        namespace: () => 'RealMQ',
      })
    )
    .pipe(gulp.dest('dist'));
});
