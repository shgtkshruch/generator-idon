var generators = require('yeoman-generator');
var fs = require('fs');
var _s = require('underscore.string');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.options['npm-install'] = true;
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
          includeSass: this.includeSass,
          includeJs: this.includeJs
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
          name: _s.slugify(this.appname)
        }
      );
      this.copy('gulpfile.coffee', 'gulpfile.coffee');
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

