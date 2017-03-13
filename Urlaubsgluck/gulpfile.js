var gulp = require('gulp');

var sass = require('gulp-sass');

var spritesmith = require('gulp.spritesmith');

var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');

gulp.task('sass', function () {
	return gulp.src('src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest('src/css/'));
});
 
gulp.task('watch', function () {
	gulp.watch('src/scss/*.scss', ['sass']);
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('src/imgpng/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    padding: 2
  }));
  return spriteData.pipe(gulp.dest('src/img/'));
});

gulp.task('sprite@2x', function () {
  var spriteData = gulp.src('src/imgpng@2x/*.png').pipe(spritesmith({
    imgName: 'sprite@2x.png',
    cssName: 'sprite@2x.css',
    padding: 4
  }));
  return spriteData.pipe(gulp.dest('src/img/'));
});

gulp.task('useref', function(){
	return gulp.src('src/index.html')
		.pipe(gulpIf('*.css', cleanCSS()))
		.pipe(gulpIf('*.js', uglify()))
		.pipe(useref())
		.pipe(gulp.dest('./'))
});

gulp.task('img', function(){
    return gulp.src('src/img/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('./img/'))
});

gulp.task('fonts', function(){
    return gulp.src('src/fonts/*.*')
        .pipe(gulp.dest('./fonts/'))
});

gulp.task('build', ['useref', 'img', 'fonts']);

gulp.task('default', ['sass', 'watch']);