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
      message: 'What is the name of the page you make?',
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
      var index = file.lastIndexOf(search);
      var start = file.substr(0, index);
      var end = file.substr(index);

      // remove extra line breaks
      var text = start + `\n\n// ${this.pageName}\n// ${this.pageName}\n\n` + end;
      text = text.replace(/\n{3,}/g, '\n\n');

      fs.writeFileSync(
        'src/styles/main.scss',
        text
      );
    }
  },
});

