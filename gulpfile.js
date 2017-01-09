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

// site data global
var site = require('./src/content/site.json');
  site.time = new Date();

//
//start tasks
//
// default
gulp.task('default', (cb)=>{
  runSequence('clean-dist', 'grind-md', cb);
});

// clean dist
gulp.task('clean-dist', ()=>{
  return gulp.src('./dist/')
    .pipe(clean());
});

//reverse index for site.tags and site.categories
gulp.task('catalog', ()=>{
  return gulp.src('./src/content/*.md')
    .pipe(frontMatter({property:'page', remove:false}))
    .pipe(addUrl(site));
});

// grinds md into templates
gulp.task('grind-md', ['catalog'], ()=>{
  return gulp.src('./src/content/*.md')
    .pipe(frontMatter({property:'page', remove:true}))//works with gulp-data
    .pipe(marked())
    .pipe(logPath())
    .pipe(attachSiteData())
    .pipe(wrap((gulpData)=>{ //data gulp-data
      return fs.readFileSync('./src/templates/' + (!gulpData.file.page.template?'default.liquid':gulpData.file.page.template)).toString()
    }, null, {engine: 'liquid'}))
    .on('error',(err)=>{console.log(err)})
    .pipe(logPath())
    .pipe(gulp.dest('dist/'));
});

// create lists (index) pages
gulp.task('create-lists',['grind-md'],()=>{
  console.log(site);
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
// adds an array for each tag and category to the site object
// adds the page's url to each tag and category property
// attaches meta-data for each page to site object
//

function addUrl(siteObj, extension = ''){
  
  return through.obj((file, enc, cb)=>{
    var pageUrl = file.path.match(/([a-zA-Z0-9_-]+)\.md/)[1];
    pageUrl = pageUrl + extension;
    siteObj[pageUrl] = file.page;
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
// used for liquid to access site data
function attachSiteData(){
    return through.obj((file, enc, cb)=>{
        file.site = site;
        cb(null,file);
    });
}
