var yeoman = require('yeoman-generator');
var fs = require('fs');
var wiredep = require('wiredep');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var choices = [];
    var jslibs = ['jQuery', 'velocity', 'Three.js'];
    var done = this.async();

    jslibs.forEach(function(jslib) {
      choices.push({name: jslib, value: jslib.toLowerCase()});
    });

    this.prompt({
      type: 'checkbox',
      name: 'jslib',
      message: 'Which do you use JavaScript Library?',
      choices: choices
    }, function(answers) {
      this.jslibs = answers.jslib;

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
    var bower = {
      name: this._.slugify(this.appname),
      private: true,
      dependencies: {}
    };

    this.jslibs.forEach(function(jslib) {
      bower.dependencies[jslib] = '*';
    });

    this.write('bower.json', JSON.stringify(bower, null, 2));
  },

  gem: function() {
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
      if (!_this.options['skip-bundle']) {
        var bundle = _this.spawnCommand('bundle', ['install', '--path', 'vendor/bundle']);
        bundle.on('close', function(code) {
          injectWiredep();
        });
      }
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

