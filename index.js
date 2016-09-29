var gulp = require('gulp');

var path = require('path');

var gulpif = require('gulp-if');

var stylus = require('gulp-stylus');

var csso = require('gulp-csso');

var poststylus = require('poststylus');

var yargs = require('yargs').argv;

var _ = require('lodash');

var cwd = process.cwd();

var default_config = {
  src: path.join(cwd, 'src', 'static', 'styles', '*.styl'),
  dest: path.join(cwd, 'dist', 'static', 'styles'),
  use: [
    require('nib')(),
    require('axis')(),
    poststylus([
      'rucksack-css',
      'pixrem'
    ])
  ]
};

var self = {
  config: default_config,
  set: function(config) {
    this.config = _.assign(this.config, config);
  },
  run: function(config) {
    styles(config || this.config);
  }
};

function condition(file) {
  if (file.relative.indexOf('/') !== file.relative.length) {
    return true;
  }

  return false;
}

function styles(config) {
  return gulp.src(config.src)

  .pipe(gulpif(condition, stylus({
    use: config.use,
    compress: (yargs.prod)? true : false
  })))

  .pipe(gulpif(yargs.prod, gulpif(condition, csso())))

  .pipe(gulpif(condition, gulp.dest(config.dest)));
}

gulp.task('styles', function() {
  self.run();
});

module.exports = self;
