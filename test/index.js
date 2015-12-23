var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('general', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, '.tmp'))
      .withOptions({'skip-install': true})
      .withPrompts({useBower: false})
      .on('end', done);
  });

  it('create expected files', function() {
    assert.file([
      '.gitignore',
      'package.json',
      'gulpfile.coffee',
      'src/index.jade',
      'src/styles/style.scss',
      'src/scripts/script.coffee'
    ]);

    assert.fileContent([
      ['package.json', '"name": "tmp"'],
      ['src/index.jade', 'title tmp']
    ]);
  });
});

