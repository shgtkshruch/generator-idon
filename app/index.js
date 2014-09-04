var yeoman = require('yeoman-generator');
var fs = require('fs');
var wiredep = require('wiredep');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();
    this.prompt({
      type: 'checkbox',
      name: 'jslib',
      message: 'Which do you use JavaScript Library?',
      choices: [{
        name: 'jQuery',
        value: 'includeJquery',
        checked: false
      },{
        name: 'Three.js',
        value: 'includeThree',
        checked: false
      }]
    }, function(answers) {

      var hasjs = function(feat) {
        return answers.jslib.indexOf(feat) !== -1;
      }

      this.includeJquery = hasjs('includeJquery');
      this.includeThree = hasjs('includeThree');

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

    if (this.includeJquery) {
      bower.dependencies.jquery = '*';
    }

    if (this.includeThree) {
      bower.dependencies['three.js'] = '*';
    }

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

