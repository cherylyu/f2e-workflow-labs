var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// will run dependencies first, and then run 'detault' until they are finished
// task1 and task2 will start at the same time actually (nodejs is async)
gulp.task('default', ['output2'], function () {
  console.log('Hi, Gulp!');
});

// cb = callback,
// if task1 and task2 both have cb(), it will run only once
// if remove cb() of task1 or task2, will stop and will not run 'default'
// gulp.task('task1', ['task2'], function (cb) {
//   console.log('task1');
//   cb();
// });

gulp.task('task1', function () {
  console.log('task1');
});

gulp.task('task2', function () {
  console.log('task2');
});

gulp.task('output1', function () {
  gulp.src('assets/vendor/bootstrap/**/*.js')
      .pipe(gulp.dest('output1'));
});

gulp.task('output2', ['clean'], function () {
  gulp.src('assets/vendor/bootstrap/**/*.js', { base: 'assets' })
      .pipe(gulp.dest('output2'));
});

gulp.task('output3', function () {
  gulp.src(['assets/vendor/**/*.css', 'assets/vendor/**/*.js'])
      .pipe(gulp.dest('output3'));
});

gulp.task('output4', function () {
  gulp.src(['assets/vendor/angular/angular*.js',
            'assets/vendor/angular-animate/angular-*.js'],
            {base: 'assets/vendor'})
      .pipe(gulp.dest('output4'));
});


gulp.task('clean', function (cb) {
  // del(['output2/vendor/bootstrap/**', '!output2/vendor/bootstrap']);
  del(['output2/**', '!output2'])
  .then(function (paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  })
  .then(cb);
});

gulp.task('watch', function (cb) {
  gulp.watch('app/**/*.js', ['concat']);
});

gulp.task('concat', function () {
  gulp.src(['app/**/*.module.js'])
      .pipe(concat('app.module.js'))
      .pipe(gulp.dest('assets'))
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js' }))
      .pipe(gulp.dest('assets'));

  gulp.src(['app/**/*.js', '!app/**/*.module.js'])
      .pipe(concat('app.bundle.js'))
      .pipe(gulp.dest('assets'))
      .pipe(uglify({ mangle: false }))
      .pipe(rename({ extname: '.min.js' }))
      .pipe(gulp.dest('assets'));
});

