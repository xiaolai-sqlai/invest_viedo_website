var gulp = require('gulp'),
scss = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
notify = require('gulp-notify'),
plumber = require('gulp-plumber'),
cssmin = require('gulp-minify-css'),
uglify = require('gulp-uglify'),
autoprefixer = require('gulp-autoprefixer'),
concat = require('gulp-concat'),
cache = require('gulp-cache'),
htmlmin = require('gulp-htmlmin'),
rename = require('gulp-rename'),
connect = require('gulp-connect'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant');



gulp.task('html', function() {
    var options = {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };
    gulp.src('src/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist'));
});

gulp.task('scss', function () {
    gulp.src('src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))       
    .pipe(scss())
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
     browsers: ['last 2 versions', 'Android >= 4.0']
 }))
    .pipe(gulp.dest('src/css'));
});

gulp.task('css', function() {
    gulp.src('src/css/*.css')
    .pipe(cssmin({
        advanced: false,
        keepBreaks: true
    }))
    .pipe(gulp.dest('dist/css'));
});


gulp.task('javascript', function() {
    gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});


gulp.task('image', function() {
    gulp.src('src/images/*.{png,jpg}')
    .pipe(cache(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant({quality: '65-80'})]
    })))
    .pipe(gulp.dest('dist/images'));
});


gulp.task('libs', function() {
    gulp.src('src/libs/*.js')
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/libs'))
});


gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true
    });
});


gulp.task('watch', function() {
    gulp.watch('src/scss/*/*.scss', ['scss']);
    gulp.watch('src/scss/*.scss', ['scss']);
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/js/*.js', ['javascript']);
    gulp.watch('src/images/*.{png,jpg}', ['image']);
    gulp.watch('src/libs/*.js', ['libs']);   
})


gulp.task('default',['connect','watch']);
