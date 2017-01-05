// for now just grinding the content into the liquid templates
// eventually images and deploy will be here too
'use strict'
//general requires
const gulp = require('gulp'),
  clean = require('gulp-clean'),
  gulpData = require('gulp-data'),
  fs = require('fs'),
  childProcess = require('child_process'),
  runSequence = require('run-sequence');

//templating requires
const frontMatter = require('gulp-front-matter'),
  marked = require('gulp-marked'),
  wrap = require('gulp-wrap');

var site = require('./src/site.json');
  site.time = new Date();