const Generator = require('yeoman-generator');
const fs = require('fs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

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
    },{
      type: 'input',
      name: 'scriptName',
      message: 'What is the name of the script you make?',
    }]).then(answers => {
      this.pageName = answers.pageName;
      this.scriptName = answers.scriptName;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('script.js'),
      this.destinationPath(`src/scripts/${this.pageName}/${this.scriptName}.js`)
    );

    const file = fs.readFileSync('src/layout.pug', 'utf-8');
    const search = '// endbuild';
    const index = file.lastIndexOf(search);
    const start = file.substr(0, index);
    const end = file.substr(index);

    fs.writeFileSync(
      'src/layout.pug',
      start + `script(src='scripts/${this.pageName}/${this.scriptName}.js')\n    ` + end
    );
  }
};

