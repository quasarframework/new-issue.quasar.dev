# Quasar New Issue Helper

> A Quasar SPA to help creating new issues

preview: https://new-issue-quasar.netlify.com/#/


## Build Setup

``` bash
# install dependencies
$ yarn

# serve
$ quasar dev

# build for production with minification
$ quasar build

# lint code
$ quasar lint
```

#Usage
- Repositories are listed in `config/repos`
- Types of issues are listed in `config/issue-types`, 
with mapping to component names inside `config/issue-type-forms`

- You can use url params to link to a specific repository 
eg. `https://example.com/#/quasarframework/quasar-play`
- After filling the form in the app, user is redirected to Github issue form with generated content.

####Sources
Inspired by and based on Vue Issue helper by Evan You

https://new-issue.vuejs.org/
https://github.com/vuejs/vue-issue-helper

#### Contributors
@panstromek
@nothingismagick  
@a47ae
@rstoenescu
