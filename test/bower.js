var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('Bower feature', function() {
  describe('on', function () {
    before(function() {
      return helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, '.tmp'))
        .withOptions({'skip-install': true})
        .withPrompts({useBower: true})
        .toPromise();
    });

    it('create expected files', function() {
      assert.fileContent([
        ['package.json', 'wiredep'],
        ['gulpfile.babel.js', 'gulp.task(\'wiredep\''],
        ['src/index.jade', 'bower:css'],
        ['src/index.jade', 'bower:js']
      ]);
    });
  });

  describe('off', function () {
    before(function() {
      return helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, '.tmp'))
        .withOptions({'skip-install': true})
        .withPrompts({useBower: false})
        .toPromise();
    });

    it('create expected files', function() {
      assert.noFileContent([
        ['package.json', 'wiredep'],
        ['gulpfile.babel.js', 'gulp.task(\'wiredep\''],
        ['src/index.jade', 'bower:css'],
        ['src/index.jade', 'bower:js']
      ]);
    });
  });
});

