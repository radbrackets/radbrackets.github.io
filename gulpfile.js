const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const header = require("gulp-header");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const pkg = require("./package.json");
const browserSync = require("browser-sync").create();

// Set the banner content
const banner = [
  "/*!\n",
  " * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n",
  " * Copyright 2013-" + new Date().getFullYear(),
  " <%= pkg.author %>\n",
  " * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n",
  " */\n",
  "",
].join("");

// Copy third-party libraries from /node_modules into /vendor
gulp.task("vendor", function () {
  return (
    // Bootstrap
    gulp
      .src([
        "./node_modules/bootstrap/dist/**/*",
        "!./node_modules/bootstrap/dist/css/bootstrap-grid*",
        "!./node_modules/bootstrap/dist/css/bootstrap-reboot*",
      ])
      .pipe(gulp.dest("./vendor/bootstrap"))
      .on("end", function () {
        // Font Awesome
        gulp
          .src([
            "./node_modules/font-awesome/**/*",
            "!./node_modules/font-awesome/{less,less/*}",
            "!./node_modules/font-awesome/{scss,scss/*}",
            "!./node_modules/font-awesome/.*",
            "!./node_modules/font-awesome/*.{txt,json,md}",
          ])
          .pipe(gulp.dest("./vendor/font-awesome"));
      })
      .on("end", function () {
        // jQuery Easing (optional, if you need it)
        // gulp
        //   .src(["./node_modules/jquery.easing/*.js"])
        //   .pipe(gulp.dest("./vendor/jquery-easing"));
      })
  );
});

// Compile SCSS
gulp.task("css:compile", function () {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest("./css"));
});

// Minify CSS
gulp.task(
  "css:minify",
  gulp.series("css:compile", function () {
    return gulp
      .src(["./css/*.css", "!./css/*.min.css"])
      .pipe(cleanCSS())
      .pipe(
        rename({
          suffix: ".min",
        })
      )
      .pipe(gulp.dest("./css"))
      .pipe(browserSync.stream());
  })
);

// CSS
gulp.task("css", gulp.series("css:compile", "css:minify"));

// Minify JavaScript
gulp.task("js:minify", function () {
  return gulp
    .src(["./js/*.js", "!./js/*.min.js"])
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest("./js"))
    .pipe(browserSync.stream());
});

// JS
gulp.task("js", gulp.series("js:minify"));

// Default task
gulp.task("default", gulp.series("css", "js", "vendor"));

// Configure the browserSync task
gulp.task("browserSync", function () {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
});

// Dev task
gulp.task(
  "dev",
  gulp.series("css", "js", "browserSync", function () {
    gulp.watch("./scss/**/*.scss", gulp.series("css"));
    gulp.watch("./js/**/*.js", gulp.series("js"));
    gulp.watch("./*.html").on("change", browserSync.reload);
  })
);
