var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('general', function() {
  before(function() {
    return helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, '.tmp'))
      .withOptions({'skip-install': true})
      .withPrompts({useBower: false})
      .toPromise();
  });

  it('create expected files', function() {
    assert.file([
      '.gitignore',
      '.babelrc',
      '.eslintrc',
      'package.json',
      'gulpfile.babel.js',
      'src/index.pug',
      'src/styles/style.scss',
      'src/scripts/script.js'
    ]);

    assert.fileContent([
      ['package.json', '"name": "tmp"'],
      ['src/index.pug', 'title tmp']
    ]);
  });
});

