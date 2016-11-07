var generators = require('yeoman-generator');
var _s = require('underscore.string');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.options['npm-install'] = true;
  },

  prompting: function () {
    return this.prompt([{
      type: 'confirm',
      name: 'useBower',
      message: 'Would you like to use Bower as package manager?',
      default: false
    }]).then(function (answers) {
      this.useBower = answers.useBower;
    }.bind(this));
  },

  writing: {
    git: function() {
      this.copy('gitignore', '.gitignore');
    },

    babel: function () {
      this.copy('babelrc', '.babelrc');
    },

    eslint: function () {
      this.copy('eslintrc', '.eslintrc');
    },

    app: function() {
      this.template(
        'index.pug',
        'src/index.pug',
        {
          name: _s.slugify(this.appname),
        }
      );

      this.template(
        'layout.pug',
        'src/partials/layout.pug',
        {
          useBower: this.useBower
        }
      );

      this.copy('main.scss', 'src/styles/main.scss');
      this.copy('main.js', 'src/scripts/main.js');
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
        'gulpfile.js',
        'gulpfile.js',
        {
          useBower: this.useBower
        }
      );
    }
  },

  bower: function () {
    if (this.useBower) {
      var bowerJson = {
        name: _s.slugify(this.appname),
        dependencies: {}
      };
      this.fs.writeJSON('bower.json', bowerJson);
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

