const Transform = require('stream').Transform;
const browserify = require('browserify');
const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

const {version} = require('./package');

// See https://github.com/eclipse/paho.mqtt.javascript/issues/150
function patchPahoMqttRef() {
  const transformStream = new Transform({objectMode: true});

  transformStream._transform = function(file, encoding, callback) {
    file.contents = Buffer.from(
      file.contents
        .toString()
        .replace(/(Paho\.MQTT)\.(Client|Message)/gm, 'PahoMQTT.$2')
    );

    callback(null, file);
  };

  return transformStream;
}

gulp.task('build', () => {
  const b = browserify({
    entries: './lib/realmq.js',
    standalone: 'RealMQ',
    debug: true,
  });

  return b
    .bundle()
    .pipe(source(`realmq-${version}.js`))
    .pipe(buffer())
    .pipe(patchPahoMqttRef())
    .pipe(gulp.dest('dist'))
    .pipe(rename(`realmq-${version}.min.js`))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
