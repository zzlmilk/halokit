var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
     exit = require('gulp-exit'),
     apidoc = require('gulp-apidoc'),
      browserify = require('browserify'),
      hbsfy = require("hbsfy"),
      destFile = 'bundle.js',
      source = require('vinyl-source-stream'),
      destFolder = './client/js/'

 //var mocha = new Mocha({reporter: 'mochawesome'})


gulp.task('default', function() {
  // 将你的默认的任务代码放在这

});

gulp.task('browserify-build', function() {
  var bundler = browserify({
      // Required watchify args

  });

  hbsfy.configure({
        extensions: ['hbs']
    });

 var bundle = function() {
        return bundler
        .transform(hbsfy)
        .bundle()
        .on('error', function(err){
            console.log(err.message);
            this.emit('end');
        })
        .pipe(source(destFile))
        .pipe(gulp.dest(destFolder));
    };

    return bundle();
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

