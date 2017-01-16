---
draft: false
categories: 
  - articles
tags: 
  - quick tips
  - Git
  - Github
  - Github Pages
title: "./dist to Github Pages"
subtitle: "subtree pushing a build to gh-pages"
imagePrefix: "projects"
imageAlt: "git subtree push --prefix dist origin gh-pages"
stub: "this is a placeholder"
footerLink: "https://github.com/timBrockman/nightcrawler-orlando/blob/master/package.json#L13"
footerText: "A working NPM deploy to gh-pages example"
---
A good README is important, but it's better to also have a demo.
For front-end project's GitHub Pages (gh-pages) can work well for hosting a demo. 
To only push your `./dist` folder to your gh-pages directory, instead of the raw source files
use:
```
git subtree push --prefix dist origin gh-pages
```
or wrapped as an npm command in a package.json
```
"scripts": {
  "deploy":"git subtree push --prefix dist origin gh-pages"
}
```
Other than no server side shenanigans, there are other limitations. 
GitHub doesn't support HTTP/2 yet.
If needed, a CDN like [Cloudflare](https://www.cloudflare.com/) can make your content faster.
