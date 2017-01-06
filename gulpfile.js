// for now just grinding the content into the liquid templates
// eventually images and deploy will be here too
'use strict'
//general requires
const gulp = require('gulp'),
  clean = require('gulp-clean'),
  gulpData = require('gulp-data'),
  fs = require('fs'),
  childProcess = require('child_process'),
  runSequence = require('run-sequence'),
  through = require('through2');

//templating requires
const frontMatter = require('gulp-front-matter'),
  marked = require('gulp-marked'),
  wrap = require('gulp-wrap');

var site = require('./src/content/site.json');
  site.time = new Date();

// clean dist
gulp.task('clean-dist', ()=>{
  return gulp.src('./dist/')
    .pipe(clean());
});

//reverse index for site.tags and site.categories
gulp.task('catalog', ()=>{
  return gulp.src('./src/content/*.md')
    .pipe(frontMatter({property:'page', remove:false}))
    .pipe(logPath());
});

//helpers
function logPath(label = 'file path: '){
    return through.obj((file, enc, cb)=>{
      console.log(file.page);
      console.log(label, file.path);
      console.log(file.contents.toString())
      cb(null, file);
    });
}
gulp.task('default', ()=>{});