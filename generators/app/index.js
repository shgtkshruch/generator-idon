const generators = require('yeoman-generator');
const _s = require('underscore.string');
const mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.options['npm-install'] = true;
  },

  prompting() {
    return this.prompt([{
      type: 'confirm',
      name: 'useBower',
      message: 'Would you like to use Bower as package manager?',
      default: false
    }]).then(answers => {
      this.useBower = answers.useBower;
    });
  },

  writing: {
    git() {
      this.copy('gitignore', '.gitignore');
    },

    babel() {
      this.copy('babelrc', '.babelrc');
    },

    eslint() {
      this.copy('eslintrc', '.eslintrc');
    },

    app() {
      this.template(
        'top.pug',
        'src/top.pug',
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

      mkdirp('src/partials/top');
      mkdirp('src/styles/top');
      mkdirp('src/images/top');

      mkdirp('src/partials/common');
      mkdirp('src/styles/common');
      mkdirp('src/images/common');
    },

    gulp() {
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

  bower() {
    if (this.useBower) {
      const bowerJson = {
        name: _s.slugify(this.appname),
        dependencies: {}
      };
      this.fs.writeJSON('bower.json', bowerJson);
    }
  },

  install() {
    if (!this.options['skip-install']) {
      this.installDependencies({
        npm: this.options['npm-install'],
        bower: false
      });
    }
  }
});

