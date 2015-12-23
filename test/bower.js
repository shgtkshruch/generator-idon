var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('Bower feature', function() {
  describe('on', function () {
    before(function(done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, '.tmp'))
        .withOptions({'skip-install': true})
        .withPrompts({useBower: true})
        .on('end', done);
    });

    it('create expected files', function() {
      assert.fileContent([
        ['package.json', 'wiredep'],
        ['gulpfile.coffee', 'gulp.task \'wiredep\''],
        ['src/index.jade', 'bower:css'],
        ['src/index.jade', 'bower:js']
      ]);
    });
  });

  describe('off', function () {
    before(function(done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, '.tmp'))
        .withOptions({'skip-install': true})
        .withPrompts({useBower: false})
        .on('end', done);
    });

    it('create expected files', function() {
      assert.noFileContent([
        ['package.json', 'wiredep'],
        ['gulpfile.coffee', 'gulp.task \'wiredep\''],
        ['src/index.jade', 'bower:css'],
        ['src/index.jade', 'bower:js']
      ]);
    });
  });
});

