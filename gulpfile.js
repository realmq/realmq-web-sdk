const browserify = require('browserify');
const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

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
    .pipe(gulp.dest('dist'))
    .pipe(rename(`realmq.min.js`))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
