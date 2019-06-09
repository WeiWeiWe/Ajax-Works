let gulp = require("gulp");
let gulpSass = require("gulp-sass");
gulp.task("sass",function(){
        return gulp.src("sass/*.scss")
        .pipe(gulpSass())
        .pipe(gulp.dest("css/"))
    })
    gulp.task("watch",function(){
        gulp.watch("sass/*.scss",["sass"]);
    })