const generators = require('yeoman-generator');
const fs = require('fs');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'scriptName',
      message: 'What is the name of the script you make?',
    }]).then(answers => {
      this.scriptName = answers.scriptName;
    });
  },

  writing: {
    script() {
      this.copy(
        'script.js',
        `src/scripts/${this.scriptName}.js`
      );
    },

    pug() {
      const file = fs.readFileSync('src/partials/layout.pug', 'utf-8');
      const search = '// endbuild';
      const index = file.lastIndexOf(search);
      const start = file.substr(0, index);
      const end = file.substr(index);

      fs.writeFileSync(
        'src/partials/layout.pug',
        start + `script(src='scripts/${this.scriptName}.js')\n    ` + end
      );
    }
  },
});

