var gulp = require('gulp');

var path = require('path');

var clean = require('gulp-clean');

var _ = require('lodash');

var cwd = process.cwd();

var default_copy_config = {
  images: {
    src: path.join(cwd, 'src', 'static', 'images', '**'),
    dest: path.join(cwd, 'dist', 'static', 'images')
  },

  typos: {
    src: path.join(cwd, 'src', 'static', 'typos', '**'),
    dest: path.join(cwd, 'dist', 'static', 'typos')
  }
};

var default_clean_config = [
  path.join(cwd, 'dist', 'static', 'scripts')
];

var self = {
  copy: {
    config: default_copy_config,
    set: function(config) {
      this.config = _.assign(this.config, config);
    },
    run: function(config) {
      return copy(config || this.config);
    }
  },
  clean: {
    config: default_clean_config,
    set: function(config) {
      this.config = config;
    },
    run: function(config) {
      try {
        gulp.src(config || this.config)
          .pipe(clean({ force: true }));
      }
      catch(e) {
      }
    }
  }
};

function copy(config) {
  _.each(config, function(item) {
    gulp.src(item.src)
      .pipe(gulp.dest(item.dest));
  });
}

gulp.task('copy', function() {
  self.copy.run();
});

gulp.task('clean', function() {
  self.clean.run();
});

module.exports = self;
