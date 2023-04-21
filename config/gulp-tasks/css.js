import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import postcss from 'gulp-postcss';
import stripCssComments from 'gulp-strip-css-comments';
import rename from 'gulp-rename';
import cssnano from 'gulp-cssnano';
import stylelint from 'stylelint';
import reporter from 'postcss-reporter';
import purgecss from 'gulp-purgecss'; // Добавляем плагин purgecss

// Флаг для включения/выключения библиотеки Bootstrap
const enableBootstrap = true;

export const css = () => {
  return app.gulp.src(`${app.path.build.css}style.css`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "CSS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(
      app.plugins.if(
        app.isBuild,
        groupCssMediaQueries()
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoprefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true
        })
      )
    )
    .pipe(
      app.plugins.if(
        app.isWebP,
        app.plugins.if(
          app.isBuild,
          webpcss({
            webpClass: ".webp",
            noWebpClass: ".no-webp"
          })
        )
      )
    )
    // Раскомментировать если нужен не сжатый дубль файла стилей
    // .pipe(app.gulp.dest(app.path.build.css))
    .pipe(
      app.plugins.if(
        app.isBuild,
        cleanCss()
      )
    )
    .pipe(postcss())
    .pipe(
      app.plugins.if(
        app.isBuild,
        stripCssComments()
      )
    )
    .pipe(
      app.plugins.if(
        enableBootstrap, // Проверка флага для включения/выключения Bootstrap
        rename({ suffix: ".with-bootstrap.min" }),
        rename({ suffix: ".min" })
      )
    )
    .pipe(cssnano()) // Минификация файла стилей
    .pipe(purgecss({ // Использование плагина purgecss
      content: [`${app.path.build.html}**/*.html`], // Указываем путь к HTML-файлам вашего проекта
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [] // Указываем функцию извлечения классов
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(
      app.plugins.if(
        app.isLint, // Проверка флага для выполнения линтеров
        postcss([
          stylelint(), // Интеграция Stylelint
          reporter({ clearAllMessages: true })
        ])
      )
    );
}
