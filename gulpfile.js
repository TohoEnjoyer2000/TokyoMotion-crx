const babel = require('gulp-babel');
const gulp = require('gulp')
const fs = require('fs')

function clean() {
    return new Promise((resolve, reject) => {
        if (fs.existsSync('./dist')) {
            fs.rmdir('./dist', (err) => {
                err ? reject() : resolve()
            })
        }
        resolve()
    })
}

function transpile() {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./dist/'))
}

function copyAllFiles() {
    return gulp
        .src([
            'src/**/*.png',
            'src/**/*.html',
            '!src/config*.json',
            'src/manifest*.json'
        ])
        .pipe(gulp.dest('./dist/'));
}

exports.default = gulp.series(transpile, clean, copyAllFiles)