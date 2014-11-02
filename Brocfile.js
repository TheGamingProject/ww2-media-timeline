var compileLess = require('broccoli-less-single'),
  concatenate = require('broccoli-concat'),
  mergeTrees  = require('broccoli-merge-trees'),
  pickFiles   = require('broccoli-static-compiler'),
  uglifyJs    = require('broccoli-uglify-js'),
  app = 'app',
  appCss,
  appHtml,
  appJs,
  appImg;

/** 
 * move the index.html file from the project /app folder
 * into the build assets folder
 */
appHtml = pickFiles(app, {
  srcDir  : '/',
  files   : ['index.html'],
  destDir : '/'
});

/**
 * concatenate and compress all of our JavaScript files in 
 * the project /app folder into a single app.js file in 
 * the build assets folder
 */
appJs = concatenate(app, {
  inputFiles : ['**/*.js'],
  outputFile : '/assets/app.js'
});
/*appJs = uglifyJs(appJs, {
    compress: true
});*/

appImg = pickFiles(app, {
  srcDir  : '/',
  files   : ['**/*.png','**/*.jpg'],
  destDir : '/'
});

appCss = compileLess(app, 'styles/app.less', '/assets/app.css');

// merge HTML, JavaScript and CSS trees into a single tree and export it
module.exports = mergeTrees([appHtml, appJs, appCss, appImg]);