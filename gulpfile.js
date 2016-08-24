var $        = require('gulp-load-plugins')();
var argv     = require('yargs').argv;
var browser  = require('browser-sync');
var gulp     = require('gulp');
var panini   = require('panini');
var rimraf   = require('rimraf');
var sequence = require('run-sequence');
var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');
var config = require('./gulp.config')();
var FAVICON_DATA_FILE = 'faviconData.json';           // File where the favicon markups are stored
var isProduction = !!(argv.production);               // Check for --production flag
var PORT = 8000;                                      // Port to use for the development server.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];   // Browsers to target when prefixing CSS.

/*
  Tasks Order:
  ------------
  1. Fonts: Copy bootstrap required fonts to dest.
  2. Clean: Delete the "dist" folder. This happens every time a build starts.
  3. Copy: Copy files out of the assets folder. This task skips over the "img", "js", "video", "pdf" and "scss" folders, which are parsed separately.
  4. Pages: Copy page templates into finished HTML files.
  5. Sass: Compile Sass into CSS. In production, the CSS is compressed.
  6. Javascript: Combine JavaScript into one file. In production, the file is minified.
  7. PictureFill: Copy Picturefull script to dest folder.
  8. Modernizr: Copy Modernizer script to dest folder.
  9. Images: Copy images to the "dist" folder. In production, the images are compressed.
  10. Generate Favicon: Generate the icons. This task takes a few seconds to complete. You should run it at least once to create the icons. Then, you should run it whenever RealFaviconGenerator updates its package (see the check-for-favicon-update task below). 
  11. Inject Favicon: Inject the favicon markups in your HTML pages. You should run this task whenever you modify a page. You can keep this task as is or refactor your existing HTML pipeline.
  12. Check Favicon for updates: Check for updates on RealFaviconGenerator (think: Apple has just released a new Touch icon along with the latest version of iOS). Run this task from time to time. Ideally, make it part of your continuous integration system. 
  13. Build: Build the "dist" folder by running all of the above tasks.
  14. Server: Start a server with LiveReload to preview the site in.
  15. Default: Build the site, run the server, and watch for file changes.
*/

gulp.task('fonts', function () {
  log("Task 1 - Processing Fonts Task.");
  return gulp.src(config.fontsIn)
  .pipe(gulp.dest(config.fontsOut));
}); // Task 1.

gulp.task('clean', function(done) {
  log("Task 2 - Processing Clean Task.");
  rimraf(config.dist, done);
}); // Task 2.

gulp.task('copy', function() {
  log("Task 3 - Processing Copy Task.");
  gulp.src(config.assets)
  .pipe(gulp.dest(config.distAssets))
}); // Task 3.

gulp.task('pages', function() {
  log("Task 4 - Processing Pages Task.");
  gulp.src(config.src + 'pages/**/*.{html,hbs,handlebars}')
  .pipe(panini({
    root: config.src + 'pages/',
    layouts: config.src + 'layouts/',
    partials: config.src + 'partials/',
    data: config.src + 'data/',
    helpers: config.src + 'helpers/'
  }))
  .pipe(gulp.dest(config.dist));
}); // Task 4.

gulp.task('pages:reset', function(cb) {
  panini.refresh();
  gulp.run('pages');
  cb();
}); // Task 4(b).

gulp.task('sass', function() {
  log("Task 5 - Processing Sass Task.");
  var cssnano = $.if(isProduction, $.cssnano({discardComments: {removeAll: true}}));
  return gulp.src(config.srcAssets + 'scss/app.scss')
  //.pipe($.sourcemaps.init())
  .pipe($.sass()
  .on('error', $.sass.logError))
  .pipe($.autoprefixer({
    browsers: COMPATIBILITY
  }))
  .pipe(cssnano)
  .pipe($.if(!isProduction, $.sourcemaps.write()))
  .pipe($.size({showFiles: true}))
  .pipe(gulp.dest(config.distAssets + 'css'))
  .pipe($.notify({
    message: 'Sass Task complete: <%= file.relative %>',
    onLast: true
  }));
}); // Task 5.

gulp.task('javascript', function() {
  log("Task 6 - Processing Javascript Task.");
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
    console.log(e);
  }));
  return gulp.src(config.javascript)
  .pipe($.sourcemaps.init())
  .pipe($.concat('app.js'))
  .pipe(uglify)
  .pipe($.if(!isProduction, $.sourcemaps.write()))
  .pipe($.size({showFiles: true}))
  .pipe(gulp.dest(config.distAssets + 'js'))
  .pipe($.notify({
    message: 'Javascript Task complete: <%= file.relative %>',
    onLast: true
  }));
}); // Task 6.

gulp.task('picturefill', function() {
  log("Task 7 - Processing Picturefill Task.");
  return gulp.src(config.picturefill)
  .pipe(gulp.dest(config.distAssets + 'js'));
}); // Task 7.

gulp.task('modernizr', function() {
  log("Task 8 - Processing Modernizer Task.");
  return gulp.src(config.modernizr)
  .pipe(gulp.dest(config.distAssets + 'js'));
}); // Task 8.

gulp.task('images', function() {
  log("Task 9 - Processing Images Task.");
  var imagemin = $.if(isProduction, $.imagemin({
    progressive: true
  }));
  return gulp.src(config.srcAssets + 'img/**/*')
  .pipe(imagemin)
  .pipe($.size({showFiles: true}))
  .pipe(gulp.dest(config.distAssets + 'img'))
  .pipe($.notify({
    message: 'Images Task complete: <%= file.relative %>',
    onLast: true
  }));
}); // Task 9.

gulp.task('generate-favicon', function(done) {
  realFavicon.generateFavicon({
    masterPicture: 'src/assets/img/master_picture.png',
    dest: 'dist/assets/img/icons',
    iconsPath: '/',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#3e1151',
        margin: '14%',
        appName: 'Nobelium'
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#3e1151',
        onConflict: 'override',
        appName: 'Nobelium'
      },
      androidChrome: {
        pictureAspect: 'shadow',
        themeColor: '#3e1151',
        manifest: {
          name: 'Nobelium',
          display: 'browser',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#3fbfad'
      }
    },
    settings: {
      compression: 3,
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    versioning: {
      paramName: 'v',
      paramValue: 'kPPybMdXj8'
    },
    markupFile: FAVICON_DATA_FILE
  }, function() {
    done();
  });
}); // Task 10.

gulp.task('inject-favicon-markups', function() {
  gulp.src(config.dist + '*.html')
  .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
  .pipe(gulp.dest(config.dist));
}); // Task 11.

gulp.task('check-for-favicon-update', function(done) {
  var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err;
    }
  });
}); // Task 12.

gulp.task('build', function(done) {
  log("Task 13 - Processing Build Task.");
  sequence('clean', ['fonts', 'pages', 'sass', 'javascript', 'picturefill', 'modernizr', 'images', 'generate-favicon', 'copy'], done);
}); // Task 13.

gulp.task('server', ['build'], function() {
  browser.init({
    server: 'dist', port: PORT
  });
}); // Task 14.

gulp.task('default', ['build', 'server'], function() {
  log("Task 15 - Processing Default Task. Use 'gulp help' for all tasks list.");
  gulp.watch(config.assets, ['copy', browser.reload]);
  gulp.watch([config.src + 'pages/**/*.html'], ['pages', browser.reload]);
  gulp.watch([config.src + '{layouts,partials}/**/*.html'], ['pages:reset', browser.reload]);
  gulp.watch([config.srcAssets + 'scss/**/*.scss'], ['sass', browser.reload]);
  gulp.watch([config.srcAssets + 'js/**/*.js'], ['javascript', browser.reload]);
  gulp.watch([config.srcAssets + 'img/**/*'], ['images', browser.reload]);
}); // Task 15.

gulp.task("help", $.taskListing); // Task 16.

// External Function to display console messages.
function log(msg) {
  if(typeof(msg)==="object") {
    for(var item in msg) {
      if(msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.yellow(msg[item]));
      }
    }
  }
  else {
    $.util.log($.util.colors.yellow(msg));
  }
}
