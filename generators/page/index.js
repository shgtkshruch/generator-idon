var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var fs = require('fs');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
    return this.prompt([{
      type: 'input',
      name: 'pageName',
      message: 'What name your page?',
    }]).then(function (answers) {
      this.pageName = answers.pageName;
    }.bind(this));
  },

  writing: {
    folders: function () {
      mkdirp(`src/partials/${this.pageName}`);
      mkdirp(`src/styles/${this.pageName}`);
      mkdirp(`src/images/${this.pageName}`);
    },

    pug: function() {
      this.template(
        'index.pug',
        `src/${this.pageName}.pug`,
        {
          title: this.pageName
        }
      );
    },

    sass: function () {
      var file = fs.readFileSync('src/styles/main.scss', 'utf-8');
      var search = '// modules';
      var index = file.indexOf(search);
      var start = file.substr(0, index + search.length);
      var end = file.substr(index + search.length);

      fs.writeFileSync(
        'src/styles/main.scss',
        start + `\n\n// ${this.pageName}` + end
      );
    }
  },
});

