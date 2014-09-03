var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  git: function() {
    this.copy('gitignore', '.gitignore');
  },

  app: function() {
    this.copy('index.jade', 'src/index.jade');
    this.copy('style.scss', 'src/styles/style.scss');
    this.copy('script.coffee', 'src/scripts/script.coffee');
  },

  gulp: function() {
    this.copy('package.json', 'package.json');
    this.copy('gulpfile.coffee', 'gulpfile.coffee');
  },

  gem: function() {
    this.copy('Gemfile', 'Gemfile');
  },

  install: function() {
    var _this = this;

    function bundleInstall() {
      if (!_this.options['skip-bundle']) {
        _this.spawnCommand('bundle', ['install', '--path', 'vendor/bundle']);
      }
    }

    if (!this.options['skip-install']) {
      this.installDependencies({
        bower: false,
        npm: true,
        skipInstall: this.options['skip-install'],
        callback: function() {
          bundleInstall();
        }
      });
    }
  }

});

