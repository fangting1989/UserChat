var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
var ngAnnotate = require('gulp-ng-annotate');  
var rev = require('gulp-rev'); 
var revCollector = require('gulp-rev-collector');
var templateCache = require('gulp-angular-templatecache');
var ngmin = require('gulp-ngmin');

var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});


gulp.task('build',['clean'],function(){
  runSequence('minifyCss','minifyJs','minifyImg','minifyHtmlCss','temphtml','libdir')
})

gulp.task("clean", function(){
    return gulp.src('dist')
        .pipe(clean());
})

//压缩css
gulp.task('minifyCss', function(){
    return gulp.src('www/css/*.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(minify())
        .pipe(concat('style.css'))
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())                           
        .pipe(gulp.dest('dist/rev/css')); 
});
//压缩js
gulp.task('minifyJs', function(){
    return gulp.src('www/js/*.js')
      .pipe(ngAnnotate())
      .pipe(ngmin({dynamic: false}))
        .pipe(uglify({ mangle: false }))
        .pipe(rename({suffix: '.min'}))
        .pipe(concat('main.js'))
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())                           
        .pipe(gulp.dest('dist/rev/js')); 
});
//压缩图片
gulp.task('minifyImg', function(){
    return gulp.src('www/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/image'));
});
gulp.task('temphtml',function(){
   return gulp.src('www/templates/*.html')
    //templateHTML.js为压缩之后的文件名，注意.js后缀名不能少
        .pipe(templateCache("templateHTML.min.js",{
          root: 'templates/',
          module:"starter"
        }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('libdir',  function() {
  return gulp.src('www/lib/**/*')
    .pipe(gulp.dest('dist/lib'))
});
//打包HTML
gulp.task('minifyHtmlCss', function(){
    return gulp.src(['./dist/rev/**/*.json', 'www/index.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector({
          replaceReved: true,
            dirReplacements: {
                'css': '/dist/css',
                'js': 'js'
              }
             }
            )
          )
        .pipe(gulp.dest('dist'));                     //- 替换后的文件输出的目录
});

