var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
     exit = require('gulp-exit'),
     apidoc = require('gulp-apidoc')

 //var mocha = new Mocha({reporter: 'mochawesome'})


gulp.task('default', function() {
  // 将你的默认的任务代码放在这

});


gulp.task('test', function (done) {
    return gulp.src('server/Test/*.js', { read: false })
    .pipe(mocha({ reporter: 'spec' }))
    .pipe(exit());

    // .pipe(mocha({ reporter: 'mochawesome',reporterOptions:{
		  //   	 reportDir: './mochawoesome',
		  //  		 reportName: 'mochareport'
// 		  //   }
// 		}
    		
// ))
   
});


gulp.task('build-apidoc', function(done){
    
    apidoc({
        src: "server/",
        dest: "doc/API"
    },done);
});

