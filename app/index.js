var yeoman = require('yeoman-generator');
var fs = require('fs');
var wiredep = require('wiredep');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var jsChoices = [];
    var jslibs = ['jQuery', 'velocity', 'Three.js'];
    var gemChoices = [];
    var gems = ['bourbon', 'breakpoint'];

    var done = this.async();

    jslibs.forEach(function(jslib) {
      jsChoices.push({name: jslib, value: jslib.toLowerCase()});
    });

    gems.forEach(function(gem) {
      gemChoices.push({name: gem, value: gem});
    });

    this.prompt([{
      type: 'checkbox',
      name: 'jslib',
      message: 'Do you want to use any JavaScript libraries?',
      choices: jsChoices
    },{
      type: 'checkbox',
      name: 'gem',
      message: 'Do you want to use any Sass libraries?',
      choices: gemChoices
    }], function(answers) {
      this.jslibs = answers.jslib;
      this.gems = answers.gem;

      done();
    }.bind(this));
  },

  git: function() {
    this.copy('gitignore', '.gitignore');
  },

  app: function() {
    this.copy('index.jade', 'src/index.jade');
    this.copy('style.scss', 'src/styles/style.scss');
    this.copy('script.coffee', 'src/scripts/script.coffee');
  },

  gulp: function() {
    this.template('package.json', 'package.json');
    this.copy('gulpfile.coffee', 'gulpfile.coffee');
  },

  bower: function() {
    if (this.jslibs.length !== 0) {
      var bower = {
        name: this._.slugify(this.appname),
        private: true,
        dependencies: {}
      };

      this.jslibs.forEach(function(jslib) {
        bower.dependencies[jslib] = '*';
      });

      this.write('bower.json', JSON.stringify(bower, null, 2));
    }
  },

  gem: function() {
    if (this.gems.length === 0) {
      return;
    }

    this.copy('Gemfile', 'Gemfile');
  },

  install: function() {
    var _this = this;

    function injectWiredep() {
      wiredep({
        directory: 'bower_components',
        bowerJson: JSON.parse(fs.readFileSync('./bower.json')),
        src: 'src/index.jade'
      });
    };

    function bundleInstall() {
      if (_this.gems.length === 0) {
        return;
      }

      var bundle = _this.spawnCommand('bundle', ['install', '--path', 'vendor/bundle']);
      bundle.on('close', function(code) {
        injectWiredep();
      });
    };

    if (!this.options['skip-install']) {
      this.installDependencies({
        bower: true,
        npm: true,
        skipInstall: this.options['skip-install'],
        callback: function() {
          bundleInstall();
        }
      });
    }
  }

});

