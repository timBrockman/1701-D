---
categories: 
  - projects
tags: 
  - JavaScript
  - node.js
  - tf-idf
  - ranked search
title: "Ranked Static Search (node.js)"
subtitle: "Created: May 2015"
imagePrefix: "static-search"
imageAlt: "Ranked Static Search (node.js)"
stub: "By indexing static content with this tool, ranked search results become possible on static sites."
---

By indexing static content with this tool, ranked search results become possible on static sites. It creates a json object with TF-IDF scores that allows performant search of content based on cosign similarity. In short, this is a node.js implimentation of Porter Stemmed, log normalized, TF-IDF that outputs a json object with some quick lookups.