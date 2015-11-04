/*
 * configuracion:
 *[
 *  {
 *    src: ['!src/templates/client/**', 'src/templates/*.jade'],
 *    dest: 'dist'
 *  }
 *]
 */

var gulp = require('gulp');

var path = require('path');

var gulpif = require('gulp-if');

var stylus = require('gulp-stylus');

var nib = require('nib');

var csso = require('gulp-csso');

var cwd = process.cwd();

var default_config = {
  src: path.join(cwd, 'src', 'static', 'styles', '**', '*.styl'),
  dest: path.join(cwd, 'dist', 'static', 'styles')
};

function condition(file) {
  if (file.relative.indexOf('/') === -1) {
    return true;
  } else {
    return false;
  }
}

module.exports = function(configs) {
  configs = configs || [default_config];

  gulp.task('styles', function() {

    configs.forEach(function(config) {
      gulp.src(config.files)

      .pipe(gulpif(condition, stylus({
        use: nib(),
        compress: true
      })))

      .pipe(gulpif(condition, csso()))

      .pipe(gulpif(condition, gulp.dest(config.build_path)));
    });
  });
};
