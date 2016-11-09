const generators = require('yeoman-generator');
const fs = require('fs');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  prompting() {

    const pages = fs.readdirSync('src')
      .filter(file => file.indexOf('layout') === -1)
      .filter(file => file.indexOf('.pug') > -1)
      .map(pugFile => pugFile.replace(/\.pug/, ''));

    pages.unshift('common');

    return this.prompt([{
      type: 'list',
      name: 'pageName',
      message: 'Do you want to create a module of which page?',
      choices: pages
    }, {
      type: 'input',
      name: 'moduleName',
      message: 'What is the name of the module you make?',
    }]).then(answers => {
      this.pageName = answers.pageName;
      this.moduleName = answers.moduleName;
    });
  },

  writing: {
    pug() {
      this.copy(
        'index.pug',
        `src/partials/${this.pageName}/${this.moduleName}.pug`
      );

      if (this.pageName !== 'common') {
        // add include statement to pug file
        const file = fs.readFileSync(`src/${this.pageName}.pug`, 'utf-8');
        const search = 'block body';
        const index = file.indexOf(search);
        const start = file.substr(0, index + search.length);
        const end = file.substr(index + search.length);

        fs.writeFileSync(
          `src/${this.pageName}.pug`,
          start + `\n  include partials/${this.pageName}/${this.moduleName}` + end
        );
      }

    },

    sass() {
      this.template(
        'style.scss',
        `src/styles/${this.pageName}/_${this.moduleName}.scss`,
        {
          moduleName: this.moduleName
        }
      );

      // add import statement to main.scss
      const file = fs.readFileSync('src/styles/main.scss', 'utf-8');
      const search = `// ${this.pageName}`;
      const index = file.lastIndexOf(search);
      const start = file.substr(0, index);
      const end = file.substr(index);

      fs.writeFileSync(
        'src/styles/main.scss',
        start + `@import '${this.pageName}/${this.moduleName}';\n` + end
      );
    }
  },
});

