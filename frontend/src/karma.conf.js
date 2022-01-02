// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '', //Configurer la base de tous les chemins relatifs utilisés
    frameworks: ['jasmine', '@angular-devkit/build-angular'], //Identifie de Jasmine comme le framework de test
    plugins: [ // Définition des plugins utilisés 
      require('karma-jasmine'),
      //Lancement de chrome
      require('karma-chrome-launcher'),
      //Génération d'un rapport
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    //Paramètres de conexion à chrome
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};