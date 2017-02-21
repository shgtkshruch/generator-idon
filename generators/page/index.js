const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const fs = require('fs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'pageName',
      message: 'What is the name of the page you make?',
    }]).then(answers => {
      this.pageName = answers.pageName;
    });
  }

  writing() {
    mkdirp(`src/partials/${this.pageName}`);
    mkdirp(`src/styles/${this.pageName}`);
    mkdirp(`src/images/${this.pageName}`);

    this.fs.copyTpl(
      this.templatePath('index.pug'),
      this.destinationPath(`src/${this.pageName}.pug`),
      {
        title: this.pageName
      }
    );

    const file = fs.readFileSync('src/styles/main.scss', 'utf-8');
    const search = '// modules';
    const index = file.lastIndexOf(search);
    const start = file.substr(0, index);
    const end = file.substr(index);

    // remove extra line breaks
    let text = start + `\n\n// ${this.pageName}\n// ${this.pageName}\n\n` + end;
    text = text.replace(/\n{3,}/g, '\n\n');

    fs.writeFileSync(
      'src/styles/main.scss',
      text
    );
  }
};

