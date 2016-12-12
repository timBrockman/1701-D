# [Timbrockman.com || timBrockman.github.io](https://timbrockman.com)

## Current Iteration
  This personal page is designed to take as little development time as possible. It uses no frameworks or libraries, just plain ol' html and css with a little optimization at build time.

  From the start keeping things simple enough to stay AMP Project compliant has been in the back of my head. The idea will be to ramp into a progressive (likely Polymer) experience from AMP cached content + service worker + use the cached content as the data store to fetch from.

## todo:

  - [x] add checklist of things to remember
  - [x] styles for links
  - [x] reconsider rem
  - [x] fix weird flex on android chrome with navigator bar
  - [x] images size/picture calculations
  - [x] images base64 backgrounds
  - [x] quick optimization checks
  - [x] imagemin or some such
    - [x] npm installs
    - [x] reuse grunt config
  - [x] progressive picture
  - [x] css refactor
  - [x] browser support audit (var, calc, clip-path, flex, shape-outside)
  - [x] @supports wrap
  - [x] ie/edge/lynx fallback/alternative
  - [ ] fix padding organization
  - [ ] create other page types (cv/profile, content page)
    - [x] profile (about page specific to author details or cv/resume)
    - [ ] single type (display single content chunk like an article)
  - [ ] create nav row under header and sidebar for mobile
  - [ ] a11y/508 audit
  - [ ] i18n?
  - [ ] amp this (ampproject.org)
  - [ ] github deployment (bash, npm, or grunt)
  - [ ] start pwa wrapper
  - [ ] simple liquid template for jekyll
  - [ ] travis
  - [ ] templatize: mustache, hugo.io
  - [ ] better on big screen (not just bigger)


# future feature wish list

## Personal/professional site containing:
  - Profile: summary, social, etc.
  - CV summary / Professional overview (.pdf résumé)
  - (future) Writing: (Announcements, Presentations, Publications, and Blog entries)
  - Recent works: (Project Portfolio)

### Profile
  - Current static landing page
  - social profiles, summary, etc.
  - Summarize projects and link to repos
  - Link to résumé pdf

### CV
  - pdf role focused resumes
  - (future) role focused infographic pages

### Writing / Content
  - (future) hugo themed static amp pages
  - (future) polymer spa content parsed by marked-element

### Featured Repos and Recent Works
  - current div figure img scr
  - (future) component of above
  - (future) amp-image of above for static
  - link out to repo or other external work
