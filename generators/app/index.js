const Generator = require('yeoman-generator');
const _s = require('underscore.string');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    return this.prompt([{
      type: 'list',
      name: 'resetCSS',
      message: 'Which reset CSS do you use?',
      choices: [
        'reset-css',
        'normalize-css',
        'sanitize-css',
      ]
    }]).then(answers => {
      this.resetCSS = answers.resetCSS;
    });
  }

  writing() {
    // README
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        title: _s.slugify(this.appname)
      }
    );

    // dotfiles
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );


    this.fs.copy(
      this.templatePath('babelrc'),
      this.destinationPath('.babelrc')
    );

    this.fs.copy(
      this.templatePath('eslintrc'),
      this.destinationPath('.eslintrc')
    );

    // pug
    this.fs.copyTpl(
      this.templatePath('index.pug'),
      this.destinationPath('src/index.pug'),
      {
        title: _s.slugify(this.appname),
      }
    );

    this.fs.copyTpl(
      this.templatePath('layout.pug'),
      this.destinationPath('src/layout.pug'),
      {
        useBower: this.useBower
      }
    );

    // sass
    this.fs.copy(
      this.templatePath('main.scss'),
      this.destinationPath('src/styles/main.scss')
    );

    this.fs.copy(
      this.templatePath('_variables.scss'),
      this.destinationPath('src/styles/_variables.scss')
    );

    this.fs.copy(
      this.templatePath('_base.scss'),
      this.destinationPath('src/styles/_base.scss')
    );

    this.fs.copy(
      this.templatePath('_layout.scss'),
      this.destinationPath('src/styles/_layout.scss')
    );

    this.fs.copy(
      this.templatePath('_utility.scss'),
      this.destinationPath('src/styles/_utility.scss')
    );

    // directories
    mkdirp('src/partials/index');
    mkdirp('src/styles/index');
    mkdirp('src/images/index');

    mkdirp('src/partials/common');
    mkdirp('src/styles/common');
    mkdirp('src/images/common');

    // gulp
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: _s.slugify(this.appname),
        useBower: this.useBower
      }
    );

    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      {
        useBower: this.useBower
      }
    );
  }

  bower() {
    const bowerJson = {
      name: _s.slugify(this.appname),
      dependencies: {
        [this.resetCSS]: '*'
      }
    };
    this.fs.writeJSON('bower.json', bowerJson);
  }

  install() {
    if (!this.options['skip-install']) {
      this.installDependencies({
        npm: false,
        yarn: true
      });
    }
  }

  end() {
    if (!this.options.test) {
      this.spawnCommand('gulp', ['wiredep']);
    }
  }
};

