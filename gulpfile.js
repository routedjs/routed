var gulp = require('gulp')
var uglify = require('gulp-uglifyjs')
var header = require('gulp-header')
var meta = require('./package.json')

var banner = '/** Routed v' + meta.version + ' by ' + meta.author + ' **/\n'

var vars = {
    version: meta.version,
    author: meta.author
}

gulp.task('default', function() {
    return gulp.src('routed.js')
        .pipe(header(banner))
        .pipe(gulp.dest('dist/'))
        .pipe(uglify('routed.min.js', {
            mangle: true,
            compress: true
        }))
        .pipe(header(banner))
        .pipe(gulp.dest('dist/'))
});
