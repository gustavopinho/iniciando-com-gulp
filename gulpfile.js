// Gulp file

var gulp = require('gulp')
var sass = require('gulp-sass')
var minifyCss = require('gulp-csso')
var minifyJs = require('gulp-uglify')
var jshint = require('gulp-jshint')
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('assets/sass/*.scss') // Especifica o caminho dos nossos arquivos sass
        .pipe(sass()) // Transforma o sass em css
        .pipe(minifyCss()) // Minifica os nossos arquivos css
        .pipe(gulp.dest('dist/css')) // Especifica o caminho de destino do arquivo minificado
        .pipe(browserSync.reload({stream: true})); // Executa um reload no browser
});

gulp.task('js', function() {
    return gulp.src('assets/js/*.js') // Especifica o caminho dos nossos arquivos JavaScript
        .pipe(jshint()) // Verifica erros em nossos arquivos
        .pipe(minifyJs()) // Minifica os nossos arquivos
        .pipe(gulp.dest('dist/js')) // Especifica o caminho de destino
        .pipe(browserSync.reload({stream: true})); // Executa um reload no browser
});

// Servidor
gulp.task('browser-sync', function() {

    // Cria um servidor estático para a nossa aplicação
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // Verifica alterações em arquivos .js e executa a tarefa js
    gulp.watch('assets/js/*.js', ['js']);
    // Verifica alteraçõe em arquivos .scss e executa  a tarefa sass
    gulp.watch('assets/sass/*.scss', ['sass']);
    // Verifica alteraçõe em arquivos .html recarrega o browser
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// Executa todas as nossas tarefas em default
// $gulp
gulp.task('default', ['sass', 'js'])

// Executa todas as nossas tarefas em ambiente de desenvolvimento
// $gulp development
gulp.task('development', ['sass', 'js', 'browser-sync'])
