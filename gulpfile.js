var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sassGlob = require('gulp-sass-glob');
var babel = require('gulp-babel');
var pug = require('gulp-pug');
var del = require('del');
var log = require('fancy-log');
var gulpSvgo = require('gulp-svgo');
var svgSprite = require('gulp-svg-sprite');
var browserSync = require('browser-sync').create();

const isLocal = process.argv.indexOf('--local');
const isBuildOnly = process.argv.indexOf('--build-only');

var config = {
	paths: {
		base: './',
		src: './_sources/',
		build: './build/',
		srcjs: './_sources/js/',
		srcpages: './_sources/pages/',
		srcsvg: './_sources/svg/',
		sass: './_sources/sass/',
		blocks: './_sources/blocks/',
		helpers: './_sources/sass/helpers/',
		js: './js/',
		css: './css/',
		maps: './sourcemaps/',
		svg: './svg/'
	},

	browserslist: [
		'last 2 version',
		'> 1%',
		'maintained node versions',
		'not dead'
	],
};

var paths = config.paths;
var browsers = config.browsers;

function clean() {
	return del.sync([paths.build + '/*']);
}

function buildSass() {
	return gulp.src([paths.sass + 'global.scss'], {sourcemaps: true})
		.pipe(sassGlob())
		.pipe(sass({
			outputStyle: 'expanded'
		})
			.on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: browsers,
			cascade: true,
			remove: false
		}))
		.pipe(gulp.dest(paths.base + paths.build + paths.css, {sourcemaps: '../' + paths.maps}))
		.pipe(browserSync.reload({stream: true}));
}

function buildJs() {
	return gulp.src([paths.srcjs + '*.js'], {sourcemaps: true})
		.pipe(babel())
		.pipe(gulp.dest(paths.base + paths.build + paths.js, {sourcemaps: '../' + paths.maps}))
		.pipe(browserSync.stream());
}

function concatBlockJs() {
	let scripts = [paths.blocks + '**/*.js'];
	return gulp.src(scripts, {sourcemaps: true})
		.pipe(concat('blocks.js'))
		.pipe(gulp.dest(paths.base + paths.build + paths.js, {sourcemaps: '../' + paths.maps}))
		.pipe(browserSync.stream());
}

function modifySvg() {
	let images = [paths.srcsvg + '*.svg'];
	return gulp.src(images)
		.pipe(gulpSvgo())
		.pipe(svgSprite({
				mode: {
					symbol: {
						sprite: 'sprite.svg',
						example: true
					},
					css: {
						sprite: 'sprite.svg',
						example: true,
						render: {
							css: true,
						}
					}
				}
		}))
        .pipe(gulp.dest(paths.base + paths.build + paths.svg));
}

function buildHTML() {
	return gulp.src(paths.srcpages + '*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(paths.build))
		.pipe(browserSync.stream());
}

function watchFiles(done) {
	if (isBuildOnly > 0) {
		log('Watcher is disabled');
		return done();
	}

	gulp.watch([paths.srcpages + '*.pug', paths.srcpages + '**/*.pug', paths.blocks + '**/*.pug'], buildHTML);
	gulp.watch(paths.blocks + '**/*.js', concatBlockJs);
	gulp.watch(paths.srcjs + '*.js', buildJs);
	gulp.watch([paths.sass + '*.scss', paths.sass + '**/*.scss', paths.blocks + '**/*.scss'], buildSass);
}

function sync(done) {
	if (isLocal > 0 && isBuildOnly <= 0) {
		browserSync.init({
			server: {
				baseDir: paths.base
			}
		})
	} else {
		log('No browser sync requested, run "gulp --local" if you want to.');
		return done();
	}
}

var build = gulp.parallel(
	gulp.series(
		buildSass,
		buildJs,
		concatBlockJs,
		buildHTML,
		modifySvg,
	),
	watchFiles,
	sync
);

exports.default = build;
