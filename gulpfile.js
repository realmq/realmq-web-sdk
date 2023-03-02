const browserify = require('browserify');
const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const replace = require('gulp-replace');
const package = require('./package.json');

gulp.task('build', () => {
  const b = browserify({
    entries: './lib/realmq.js',
    standalone: 'RealMQ',
    debug: true,
  });

  return b
    .bundle()
    .pipe(source(`realmq.js`))
    .pipe(buffer())
    .pipe(replace('%%SDK-VERSION%%', package.version))
    .pipe(gulp.dest('dist'))
    .pipe(rename(`realmq.min.js`))
    .pipe(uglify())
  .on('error', function (err) { console.log(err); })

  .pipe(gulp.dest('dist'));
});
