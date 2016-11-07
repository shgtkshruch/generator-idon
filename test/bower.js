const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

describe('Bower feature', () => {
  describe('on', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(__dirname, '.tmp'))
        .withOptions({'skip-install': true})
        .withPrompts({useBower: true})
        .toPromise();
    });

    it('create expected files', () => {
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

  describe('off', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(__dirname, '.tmp'))
        .withOptions({'skip-install': true})
        .withPrompts({useBower: false})
        .toPromise();
    });

    it('create expected files', () => {
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

