var yeoman = require('yeoman-generator');
var fs = require('fs');
var wiredep = require('wiredep');

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    this.options['bower-install'] = false;
    this.options['npm-install'] = true;
  },

  prompting: function() {
    var jsChoices = [];
    var sassChoices = [];

    var jslibs = ['jQuery', 'velocity', 'Three.js'];
    var sasslibs = ['bourbon', 'breakpoint'];

    var done = this.async();

    jslibs.forEach(function(jslib) {
      jsChoices.push({name: jslib, value: jslib.toLowerCase()});
    });

    sasslibs.forEach(function(sasslib) {
      sassChoices.push({name: sasslib, value: sasslib});
    });

    this.prompt([{
      type: 'checkbox',
      name: 'jslib',
      message: 'Do you want to use any JavaScript libraries?',
      choices: jsChoices
    },{
      type: 'checkbox',
      name: 'sasslib',
      message: 'Do you want to use any Sass libraries?',
      choices: sassChoices
    }], function(answers) {
      this.jslibs = answers.jslib;
      this.sasslibs = answers.sasslib;

      function hasFeature(feat) {
        return answers[feat].length !== 0;
      }

      this.includeJs = hasFeature('jslib');
      this.includeSass = hasFeature('sasslib');

      if (this.includeJs || this.includeSass) {
        this.options['bower-install'] = true;
      }

      done();
    }.bind(this));
  },

  git: function() {
    this.copy('gitignore', '.gitignore');
  },

  gtihubPages: function() {
    this.copy('github-pages.sh', 'github-pages.sh');
  },

  app: function() {
    this.template('index.jade', 'src/index.jade');
    this.copy('style.scss', 'src/styles/style.scss');
    this.copy('script.coffee', 'src/scripts/script.coffee');
  },

  gulp: function() {
    this.template('package.json', 'package.json');
    this.copy('gulpfile.coffee', 'gulpfile.coffee');
  },

  csscomb: function () {
    this.copy('csscomb.json', '.csscomb.json');
  },

  bower: function() {
    var bower = {
      name: this._.slugify(this.appname),
      private: true,
      dependencies: {},
      devDependencies: {}
    };

    if (this.includeJs) {
      this.jslibs.forEach(function(jslib) {
        bower.dependencies[jslib] = '*';
      });
    }

     if (this.includeSass) {
      this.sasslibs.forEach(function(sasslib) {
        bower.devDependencies[sasslib] = '*';
      });
    }

     if (this.options['bower-install']) {
      this.write('bower.json', JSON.stringify(bower, null, 2));
    }
  },

  install: function() {
    var _this = this;

    function injectWiredep() {
      if (!_this.options['bower-install']) {
        return;
      }

      // JavaScri libraries
      wiredep({
        directory: 'bower_components',
        bowerJson: JSON.parse(fs.readFileSync('./bower.json')),
        src: 'src/index.jade',
      });

      // Sass libraries
      wiredep({
        directory: 'bower_components',
        bowerJson: JSON.parse(fs.readFileSync('./bower.json')),
        src: 'src/styles/style.scss',
        devDependencies: true
      });
    }

    if (!this.options['skip-install']) {
      this.installDependencies({
        bower: this.options['bower-install'],
        npm: this.options['npm-install'],
        skipInstall: this.options['skip-install'],
        callback: function() {
          injectWiredep();
        }
      });
    }
  }

});

