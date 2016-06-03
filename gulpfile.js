var gulp         = require('gulp');

var sass         = require('gulp-sass');
var browserSync  = require('browser-sync').create();
var del          = require('del');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var cssnano      = require('cssnano');
var runSequence  = require('run-sequence');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer')

var bases = {
  app: 'app/',
  dist: 'dist/',
};

var paths = {
  scripts: ['scripts/**/*.js', '!scripts/libs/**/*.js'],
  libs: ['scripts/libs/jquery/jquery.js'],
  styles: ['styles/**/*.css'],
  html: ['index.html'],
  images: ['images/**/*.png'],
};

gulp.task('clean:dist', function() {
  return del.sync(bases.dist);
});

gulp.task('build', function(callback) {
  runSequence('clean:dist',
              ['css', 'scripts'],
              'copy',
              callback);
});

gulp.task('copy', function() {

  // Copy html
  gulp.src(paths.html, {cwd: bases.app})
    .pipe(gulp.dest(bases.dist))
    browserSync.reload();
});

gulp.task('styles', function() {
  return gulp.src(bases.app + 'styles/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(bases.app + 'styles'));
});

gulp.task('css', function() {
  var processors = [
    autoprefixer({browsers: ['last 1 version']}),
    cssnano(),
  ];
  return gulp.src(bases.app + 'styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest(bases.dist + 'styles'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
  return gulp.src([bases.app + 'scripts/libs/**/*.js', bases.app + 'scripts/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(bases.dist + 'scripts'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    files: [
      bases.dist + 'scripts/*.js'
    ]
  });

  gulp.watch(bases.app + '*.html', ['build']);
  gulp.watch(bases.app + 'scripts/*.js', ['scripts']);
  gulp.watch(bases.app + 'styles/*.scss', ['css']);
});

gulp.task('default', ['build', 'serve']);
