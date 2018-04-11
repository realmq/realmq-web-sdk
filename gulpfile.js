const Transform = require('stream').Transform;
const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const umd = require('gulp-umd');

const {version} = require('./package');

// Monkey patch paho build - remove umd wrapper that causes trouble
// in browserify/nodeJS contexts.
function patchPahoMqtt() {
  const transformStream = new Transform({objectMode: true});

  transformStream._transform = function(file, encoding, callback) {
    const error = null;
    if (file.path.indexOf('paho-mqtt.js') !== -1) {
      file.contents = Buffer.from(
        file.contents
          .toString()
          .replace(
            /\(function ExportLibrary[\S\s]*function LibraryFactory\(\){/gm,
            ''
          )
          .replace(/return PahoMQTT;\n}\);/gm, '')
      );
    }
    callback(error, file);
  };

  return transformStream;
}

gulp.task('build', () => {
  return gulp
    .src(['node_modules/paho-mqtt/paho-mqtt.js', 'lib/**/*.js'])
    .pipe(patchPahoMqtt())
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
