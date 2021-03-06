const { src, dest, watch, series } = require('gulp');
const { delDir } = require('./until/file');
const uglifycss = require('gulp-uglifycss');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

/**
 * html task
 */
async function htmlTask() {
    return src('src/**.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist'));
}


/**
 * js task
 */
async function jsTask(env) {
    delDir('dist/js/');
    if (env === 'build') {
        return src('src/js/*.js')
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(uglify())
            .pipe(dest('dist/js/'))
    } else {
        return src('src/js/**')
            .pipe(dest('dist/js/'));
    }
}


/**
 * css task
 */
async function cssTask() {
    delDir('dist/css/');
    return src('src/css/**')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        })).pipe(dest('dist/css/'))
}

/**
 * img task
 */
async function imgTask() {
    delDir('dist/img/');
    return src('src/img/**')
        .pipe(dest('dist/img/'));
}

/**
 * plugin task
 */
async function pluginTask() {
    delDir('dist/plugin/');
    return src('src/plugin/**')
        .pipe(dest('dist/plugin/'));
}



/**
 * all task
 */
async function tasks(env) {
    await htmlTask();
    await jsTask(env);
    await pluginTask();
    await cssTask();
}

/**
 * start 
 */
async function start() {
    await tasks();
    watch('src/css/**', cssTask);
    watch('src/js/**', jsTask);
    watch('src/plugin/**', pluginTask);
    watch('src/**.html', htmlTask);
    watch('src/public/**.html', series(htmlTask));
    browserSync.init({
        port: 8000,
        server: {
            baseDir: "./dist",
        }
    });
}

/**
 * build
 */
async function build() {
    await tasks('build');
}


exports.start = start;
exports.build = build;