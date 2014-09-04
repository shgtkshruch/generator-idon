var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');

describe('CSS generator', function() {
  describe('Run test', function() {

    var options = {
      'skip-install': true,
      'skip-bundle': true
    };

    var runGen;

    beforeEach(function() {
      runGen = helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, '.tmp'))
    });

    it('create expected files', function(done) {
      runGen.withOptions(options).withPrompt({jslib: ['includeJquery']})
      .on('end', function() {

        assert.file(
          'src/index.jade',
          'src/styles/style.scss',
          'src/scripts/script.coffee',
          '.gitignore',
          'package.json',
          'bower.json',
          'gulpfile.coffee'
        );

        assert.fileContent([
          ['bower.json', /jquery/],
          ['bower.json', /"name": "tmp"/]
        ]);

        assert.noFileContent([
          ['bower.json', /three\.js/]
        ]);

        done();
      });
    });

  });
});

