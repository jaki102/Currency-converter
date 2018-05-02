var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('reload', function(){
    browserSync.reload();
})

gulp.task('serve',function(){

    browserSync({
        server: 'src'
    });

    gulp.watch('src/*.html', ['reload']);
    gulp.watch('src/*.css', ['reload']);
    gulp.watch('src/*.js', ['reload']);
});
gulp.task('default', ['serve']);