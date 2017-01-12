# [Timbrockman.com || timBrockman.github.io](https://timbrockman.com)

## Iterations

### Current iteration

A completed AMP compliant liquid template that loads quickly and still looks/feels decent with minimal AMP components.

### Last iteration

A personal page is designed to take as little development time as possible. It uses no frameworks or libraries, just plain ol' html and css with a little optimization at build time.

### Future iterations

As I get things to work I'll let you know.

  - Clean up the build and ditch tinyliquid for pretty much anything (probably hbs or mustache)
  - Add some nice AMP Components
  - From the start keeping things simple enough to stay AMP Project compliant has been in the back of my head.
  - The idea will be to ramp into a progressive (likely Polymer) experience from AMP cached content + service worker + use the cached content as the data store to fetch from.
  - I would also like to rig travis to actually build and deploy new commits. Create a draft branch for content, then as it is merged to the build branch travis runs, clones master in a fresh directory, then copies from build/dist to new master, then pushes new master.
  - The PWA app template will stay generaly untouched once developed.
  
## todo:
Moved to projects I get distracted, have new ideas, then make longer lists.

### ongoing

  - recheck a11y and 508
  - recheck actual live cross-browser and device results before release
  - Build some simple generators after the iterations reach release points.

### current/queued before release:

  - [ ] templating, pages, & layouts
    - [x] amp this (ampproject.org)
      - [x] metadata
      - [x] amp sidebar
      - [x] amp images
      - [x] css -> style amp-custom
      - [x] amp development=1 checklist
    - [x] liquid templates
      - [x] single template
      - [x] build process
      - [x] compontentish snippet/partial breakdown vs 7-1
    - [ ] create other page types (cv/profile, content page)
      - [ ] cv/about content
      - [ ] articles
        - [ ] gh-pages
        - [ ] amp analytics
        - [ ] amp tldr
        - [ ] web-workers
      - [x] projects
        - [x] app-layout
        - [x] k8s.io
        - [x] polymerfire-upload
        - [x] ranked static search
      - [x] single type (display single content chunk like an article)
      - [x] profile (about page specific to author details or cv/resume)
    - [x] liquid templates/snippets
      - [x] body
      - [x] footer
      - [x] header
      - [x] meta
      - [x] sidebar
  - [x] start separate src/build branch
  - [x] svg logo
  - [x] sidebar and burger style
  - [x] favicons and other icons
  - [x] starter content
  - [ ] remove build files from master
  - [ ] create deploy process to subtree push build branch dist/ to master
  - [x] build: category and tag cataloging
  - [ ] rework content styling
  - [ ] proofread/revise starter content
    - [ ] index/profile
    - [ ] projects
    - [ ] articles
  - [ ] refactor to nunjucks from tinyliquid (k-v access to annoying)
  - [ ] gulp image build

### backlog:

  - [ ] liquid template (gulp site)
    - [ ] list template
    - [ ] profile template  
  - [ ] add social share
  - [ ] add styles for lists
  - [ ] add styles for tables
  - [ ] create image helper/mixin
  - [ ] md/content styles (create checklist)
  - [ ] create nav row under header and sidebar for mobile
  - [ ] a11y/508 audit
  - [ ] i18n?
  - [ ] switch from grunt imagemin to gulp
  - [ ] start pwa wrapper
  - [ ] travis
  - [ ] templatize: mustache, hugo.io
  - [ ] better on big screen (not just bigger)

### done:

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
  - [x] fix padding organization
  - [x] add banner styles
  - [x] refactor images and banner css to fill container


## future feature wish list

### Personal/professional site containing:
  - Profile: summary, social, etc.
  - CV summary / Professional overview (.pdf résumé)
  - (future) Writing: (Announcements, Presentations, Publications, and Blog entries)
  - Recent works: (Project Portfolio)

#### Profile
  - Current static landing page
  - social profiles, summary, etc.
  - Summarize projects and link to repos
  - Link to résumé pdf

#### CV
  - pdf role focused resumes
  - (future) role focused infographic pages

#### Writing / Content
  - -(future) hugo themed static amp pages-
  - (future) polymer spa content -parsed by marked-element-

#### Featured Repos and Recent Works
  - current div figure img scr
  - (future) component of above
  - (future) amp-image of above for static
  - link out to repo or other external work
