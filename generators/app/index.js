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
    readme() {
      this.template(
        'README.md',
        'README.md',
        {
          title: _s.slugify(this.appname)
        }
      )
    },

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
        'index.pug',
        'src/index.pug',
        {
          title: _s.slugify(this.appname),
        }
      );

      this.template(
        'layout.pug',
        'src/layout.pug',
        {
          useBower: this.useBower
        }
      );

      this.copy('main.scss', 'src/styles/main.scss');
      this.copy('_variables.scss', 'src/styles/_variables.scss');
      this.copy('_base.scss', 'src/styles/_base.scss');
      this.copy('_layout.scss', 'src/styles/_layout.scss');
      this.copy('_utility.scss', 'src/styles/_utility.scss');

      mkdirp('src/partials/index');
      mkdirp('src/styles/index');
      mkdirp('src/images/index');

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

