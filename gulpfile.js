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
    .pipe(addUrl(site))
    .pipe(logPath('foo'));
});

//helpers
function logPath(label = 'file path: '){
    return through.obj((file, enc, cb)=>{
      //console.log(file.page);
      console.log(label, file.path);
      //console.log(file.contents.toString());
      //console.log(site.tags);
      cb(null, file);
    });
}
//
// adds the page's url to each tag and category property of the site object
function addUrl(siteObj, extension = ''){
  
  return through.obj((file, enc, cb)=>{
    var pageUrl = file.path.match(/([a-zA-Z0-9_-]+)\.md/)[1];
    pageUrl = pageUrl + extension;
    //refactor the following at some point
    siteObj.tags = siteObj.hasOwnProperty('tags')?siteObj.tags:{};
    if(file.page.hasOwnProperty('tags')){
      file.page.tags.forEach((tag)=>{
        siteObj.tags[tag] = siteObj.tags.hasOwnProperty(tag)?siteObj.tags[tag]:[];
        siteObj.tags[tag].push(pageUrl);
      });
    }
    siteObj.categories = siteObj.hasOwnProperty('categories')?siteObj.categories:{};
    if(file.page.hasOwnProperty('categories')){
      file.page.categories.forEach((category)=>{
        siteObj.categories[category] = siteObj.categories.hasOwnProperty(category)?siteObj.categories[category]:[];
        siteObj.categories[category].push(pageUrl);
      });
    }
    cb(null, file);
  });
}
gulp.task('default', ()=>{});