var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var path = require('path');

describe('general', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, '.tmp'))
      .withOptions({
        'skip-install': true,
        'bower-install': false,
        'npm-install': false
      })
      .withPrompts({
        jslib: [],
        sasslib: []
      })
      .on('end', done);
  });

  it('create expected files', function() {

    assert.file([
      '.gitignore',
      '.csscomb.json',
      'package.json',
      'gulpfile.coffee',
      'src/index.jade',
      'src/styles/style.scss',
      'src/scripts/script.coffee'
    ]);

    assert.noFile(['bower.json']);

    assert.fileContent([
      ['package.json', /"name": "tmp"/],
      ['src/index.jade', /title tmp/]
    ]);

    assert.noFileContent([
      ['src/styles/style.scss', /bower:scss/],
      ['src/index.jade', /bower:css/],
      ['src/index.jade', /bower:js/],
      ['gulpfile.coffee', /wiredep\(\)/]
    ]);
  });
});

