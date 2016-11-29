const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

describe('general', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(path.join(__dirname, '.tmp'))
      .withOptions({
        'skip-install': true,
        test: true
      })
      .withPrompts({resetCSS: 'normalize.css'})
      .toPromise();
  });

  it('create expected files', () => {
    assert.file([
      '.gitignore',
      '.babelrc',
      '.eslintrc',
      'README.md',
      'bower.json',
      'package.json',
      'gulpfile.js',
      'src/index.pug',
      'src/layout.pug',
      'src/styles/main.scss',
      'src/styles/_variables.scss',
      'src/styles/_base.scss',
      'src/styles/_layout.scss',
      'src/styles/_utility.scss',
    ]);

    assert.fileContent([
      ['README.md', '# tmp'],
      ['package.json', '"name": "tmp"'],
      ['src/index.pug', 'title tmp']
    ]);
  });
});

