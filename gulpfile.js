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
  through = require('through2'),
  Vinyl = require('vinyl');

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
// clean indices
gulp.task('clean-indices', ()=>{
  return gulp.src(['./src/categories', './src/tags'])
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
    //.pipe(logPath())
    .pipe(attachSiteData())
    .pipe(wrap((gulpData)=>{ //data gulp-data
      return fs.readFileSync('./src/templates/' + (!gulpData.file.page.template?'default.liquid':gulpData.file.page.template)).toString()
    }, null, {engine: 'liquid'}))
    .on('error',(err)=>{console.log(err)})
    //.pipe(logPath())
    .pipe(gulp.dest('dist/'));
});

// create lists (index) pages
gulp.task('create-list-files',['grind-md', 'clean-indices'],()=>{
  //console.log(site);
  createFiles();
  createFiles('tags');
  return null;
});

// grind lists
gulp.task('grind-lists', ['create-list-files'],()=>{
  return gulp.src(['./src/tags/*.html', './src/categories/*.html'])
    .pipe(attachSiteData())
    //.pipe(logPath())
    .pipe(wrap((gulpData)=>{ //data gulp-data
      return fs.readFileSync('./src/templates/list.liquid').toString()
    }, null, {engine: 'liquid'}))
    .pipe(gulp.dest('./dist/ls/'));
});

//helpers
function logPath(label = 'file path: '){
    return through.obj((file, enc, cb)=>{
      //console.log(file.page);
      console.log(label, file.path);
      //console.log(file.contents.toString());
      console.log(site.tags);
      cb(null, file);
    });
}

function createFiles(type = 'categories', cb = ()=>{return true;}){
  var dir = './src/' + type
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }  
  for(var item in site[type]){
    var path = dir + '/' + item.replace(/\W+/g, '-') + '.html';
    fs.openSync(path, 'w');
  }
  cb();
}
//add permalink if none exists
function addPermalink(extension = ''){
  return through.obj((file, enc, cb)=>{
    if (!file.page.hasOwnProperty('permalink')){
      file.page.permalink = file.path.match(/([a-zA-Z0-9_-]+)\.md/)[1] + extension;
    }
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
    //
    siteObj.lookup = siteObj.hasOwnProperty('lookup')?siteObj.lookup:{};
    siteObj.lookup.tags = siteObj.lookup.hasOwnProperty('tags')?siteObj.lookup.tags:[];
    siteObj.lookup.categories = siteObj.lookup.hasOwnProperty('categories')?siteObj.lookup.categories:[];
    
    //refactor the following at some point
    siteObj.tags = siteObj.hasOwnProperty('tags')?siteObj.tags:{};
    if(file.page.hasOwnProperty('tags')){
      file.page.tags.forEach((tag)=>{
        if(siteObj.lookup.tags.indexOf(tag) <= -1){
          siteObj.lookup.tags.push(tag);
        }
        siteObj.tags[tag] = siteObj.tags.hasOwnProperty(tag)?siteObj.tags[tag]:[];
        siteObj.tags[tag].push(pageUrl);
      });
    }
    siteObj.categories = siteObj.hasOwnProperty('categories')?siteObj.categories:{};
    if(file.page.hasOwnProperty('categories')){
      file.page.categories.forEach((category)=>{
        if(siteObj.lookup.categories.indexOf(category) <= -1){
          siteObj.lookup.categories.push(category);
        }
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
