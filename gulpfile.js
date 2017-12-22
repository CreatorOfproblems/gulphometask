const gulp = require('gulp');

// plumber and notify

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");

// connect
const connect = require('gulp-connect-multi')();

gulp.task('connect', connect.server({
	host: '127.0.0.1',
	port: 8090,
	root: ['site'],
	livereload: true,
	open: {
		browser: 'chrome'
	}
}));

// template
const htmlmin = require('gulp-htmlmin');

gulp.task('template', () => {
	gulp.src('./dev/*.html')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./site/'))
		.pipe(connect.reload());
});

// style
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('style', () => {
	gulp.src('./dev/scss/style.scss')
		pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./site/'))
		.pipe(connect.reload());
});

// script 
const concat = require('gulp-concat');
const uglify = require('gulp-uglify'); 

gulp.task('script', () => {
	gulp.src('./dev/js/*.js')
		pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./site/'))
		.pipe(connect.reload());
});


// image
const imagemin = require('gulp-imagemin');

gulp.task('image', () => {
	gulp.src('./dev/img/*')
		.pipe("plumber")
		.pipe(imagemin())
		.pipe(gulp.dest('./site/img/'))
		.pipe(connect.reload());
});

// watch
gulp.task('watch', () => {
	gulp.watch('./dev/*.html', ['template']);
	gulp.watch('./dev/scss/*.scss', ['style']);
	gulp.watch('./dev/js/*.js', ['script']);
	gulp.watch('img/*.{png,jpg,jpeg,gif,svg}', {cwd: './dev/'}, ['image']);
});

gulp.task('default', ['template', 'style', 'script', 'image']);
gulp.task('dev', ['default', 'connect', 'watch']);