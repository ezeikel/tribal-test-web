var gulp        = require('gulp');

var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();
var del         = require('del');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');

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

gulp.task('build', ['clean:dist', 'styles', 'scripts'], function() {

  // Copy html
  gulp.src(paths.html, {cwd: bases.app})
    .pipe(gulp.dest(bases.dist))
    browserSync.reload();

  // Copy styles
  gulp.src(paths.styles, {cwd: bases.app})
    .pipe(gulp.dest(bases.dist + 'styles'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('styles', function() {
  return gulp.src(bases.app + 'styles/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/styles'));
    // .pipe(browserSync.reload({
    //   stream: true
    // }));
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
  });

  gulp.watch('app/**/*', ['build']);
});

gulp.task('default', ['build', 'serve']);
