const gulp = require("gulp");
const shell = require("shelljs");
const autoprefixer = require("gulp-autoprefixer");
const htmlmin = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");
const es = require("event-stream");
const jsminify = require("gulp-minify");
const template = require("gulp-template");
const concat = require("gulp-concat");
const purgecss = require("gulp-purgecss");

const { version } = require("./package.json");

const ga_token = "UA-131142260-9";

shell.rm("-rf", "./dist");
shell.mkdir("./dist");
shell.cp("-fR", "./src/img", "./dist/img");

gulp.task("minify", (cb) => {
  return es
    .concat(
      gulp
        .src("src/*.html")
        .pipe(template({ version, ga_token }))
        .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: false }))
        .pipe(gulp.dest("dist")),
      gulp
        .src(["src/lib/**/*.css", "src/css/*.css"]) //"src/lib/**/*.css"
        .pipe(concat("stylesheet.css"))
        .pipe(
          purgecss({
            content: ["src/*.html", "src/lib/**/*.js", "src/js/**/*.js"],
          })
        )
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(
          autoprefixer({
            overrideBrowserslist: ["defaults"],
            cascade: false,
          })
        )
        .pipe(gulp.dest("dist/css")),
      gulp
        .src(["src/lib/**/*.js", "src/js/**/*.js"]) //"src/lib/**/*.js"
        .pipe(concat("bundle.js"))
        .pipe(
          jsminify({
            ext: {
              src: "-debug.js",
              min: ".js",
            },
          })
        )
        .pipe(gulp.dest("dist/js")),
      gulp.src("src/font/**/*").pipe(gulp.dest("dist/font"))
      // gulp.src("src/lib/**/*").pipe(gulp.dest("dist/lib"))
    )
    .on("end", cb);
});

gulp.task("default", gulp.task("minify"));
gulp.task("dev", () => {
  gulp.watch(["src"], { ignoreInitial: false }, gulp.task("minify"));
});
