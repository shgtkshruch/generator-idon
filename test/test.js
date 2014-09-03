var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');


describe('CSS generator', function() {
  describe('Run test', function() {

    var options = {
      'skip-bundle': true
    };

    var runGen;

    beforeEach(function() {
      runGen = helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, '.tmp'))
    });

    it('create expected files', function(done) {
      runGen.withOptions(options).on('end', function() {
        assert.file(
          'src/index.jade',
          'src/styles/style.scss',
          'src/scripts/script.coffee',
          '.gitignore',
          'package.json',
          'gulpfile.coffee'
        );
        done();
      });
    });

  });
});
