var generators = require('yeoman-generator');
var _s = require('underscore.string');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.options['npm-install'] = true;
  },

  prompting: function () {
    var done = this.async();

    this.prompt([{
      type: 'confirm',
      name: 'useBower',
      message: 'Would you like to use Bower as package manager?',
      default: false
    }], function (answers) {
      this.useBower = answers.useBower;
      done();
    }.bind(this));
  },

  writing: {
    git: function() {
      this.copy('gitignore', '.gitignore');
    },

    app: function() {
      this.template(
        'index.jade',
        'src/index.jade',
        {
          name: _s.slugify(this.appname),
          useBower: this.useBower
        }
      );
      this.copy('style.scss', 'src/styles/style.scss');
      this.copy('script.coffee', 'src/scripts/script.coffee');
      mkdirp('src/images');
      mkdirp('src/partials');
    },

    gulp: function() {
      this.template(
        'package.json',
        'package.json',
        {
          name: _s.slugify(this.appname),
          useBower: this.useBower
        }
      );
      this.template(
        'gulpfile.coffee',
        'gulpfile.coffee',
        {
          useBower: this.useBower
        }
      );
    }
  },

  install: function() {
    if (!this.options['skip-install']) {
      this.installDependencies({
        npm: this.options['npm-install'],
        bower: false
      });
    }
  }
});

