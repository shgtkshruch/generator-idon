const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

describe('general', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(path.join(__dirname, '.tmp'))
      .withOptions({'skip-install': true})
      .withPrompts({useBower: false})
      .toPromise();
  });

  it('create expected files', () => {
    assert.file([
      '.gitignore',
      '.babelrc',
      '.eslintrc',
      'package.json',
      'gulpfile.js',
      'src/top.pug',
      'src/styles/main.scss',
      'src/styles/_variables.scss',
      'src/styles/_base.scss',
      'src/styles/_layout.scss',
      'src/styles/_utility.scss',
      'src/scripts/main.js'
    ]);

    assert.fileContent([
      ['package.json', '"name": "tmp"'],
      ['src/top.pug', 'title tmp']
    ]);
  });
});

