var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');
var path = require('path');

describe('jquery', function () {
  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, '.tmp'))
      .withOptions({
        'skip-install': true,
        'bower-install': false,
        'npm-install': false
      })
      .withPrompts({
        jslib: ['jquery'],
        sasslib: ['bourbon']
      })
      .on('end', done);
  });

  it('create expected bower files', function() {

    assert.file([
      'bower.json'
    ]);

    assert.fileContent([
      ['bower.json', /"name": "tmp"/],
      ['bower.json', /jquery/],
      ['bower.json', /bourbon/],
      ['src/index.jade', /bower:css/],
      ['src/index.jade', /bower:js/],
      ['src/styles/style.scss', /bower:scss/],
      ['gulpfile.coffee', /wiredep\(\)/]
    ]);
  });
});

