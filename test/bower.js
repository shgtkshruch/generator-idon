var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

describe('Bower feature', function() {
  describe('on', function () {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(__dirname, '.tmp'))
        .withOptions({'skip-install': true})
        .withPrompts({useBower: true})
        .toPromise();
    });

    it('create expected files', function() {
      assert.file(['bower.json']);

      assert.fileContent([
        ['package.json', 'wiredep'],
        ['gulpfile.js', 'gulp.task(\'wiredep\''],
        ['src/index.pug', 'tmp'],
        ['src/partials/layout.pug', 'bower:css'],
        ['src/partials/layout.pug', 'bower:js']
      ]);
    });
  });

  describe('off', function () {
    before(function() {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(__dirname, '.tmp'))
        .withOptions({'skip-install': true})
        .withPrompts({useBower: false})
        .toPromise();
    });

    it('create expected files', function() {
      assert.noFile(['bower.json']);

      assert.noFileContent([
        ['package.json', 'wiredep'],
        ['gulpfile.js', 'gulp.task(\'wiredep\''],
        ['src/partials/layout.pug', 'bower:css'],
        ['src/partials/layout.pug', 'bower:js']
      ]);
    });
  });
});

