var compileLess = require('broccoli-less-single'),
  concatenate = require('broccoli-concat'),
  mergeTrees  = require('broccoli-merge-trees'),
  pickFiles   = require('broccoli-static-compiler'),
  uglifyJs    = require('broccoli-uglify-js'),
  Handlebars = require('handlebars'),
  broccoliHandlebars = require('broccoli-handlebars');

var app = 'app',
  appCss,
  appHtml,
  appJs,
  appImg,
  appHbs;

var env = require('broccoli-env').getEnv();
var IS_PRODUCTION_ENV = env === 'production';


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
  files   : ['**/*.png'],
  destDir : '/'
});

appCss = compileLess(app, 'styles/app.less', '/assets/app.css');

/**
 *  handlebars
 */

appHbs = pickFiles(app, {
  srcDir  : '/',
  files   : ['**/*.hbs'],
  destDir : '/'
});

appHbs = precompileHandlebarsConcat(appHbs, {
  outputFile: '/assets/hbs.js'
});


// merge HTML, JavaScript and CSS trees into a single tree and export it
module.exports = mergeTrees([appHtml, appJs, appCss, appImg, appHbs]);