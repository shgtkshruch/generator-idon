var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');

describe('Yo idon generator', function() {
  describe('Run test', function() {

    var options = {
      'skip-install': true
    };

    var expected = [
      'src/index.jade',
      'src/styles/style.scss',
      'src/scripts/script.coffee',
      '.gitignore',
      'package.json',
      'gulpfile.coffee'
    ];

    var runGen;

    beforeEach(function() {
      runGen = helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, '.tmp'));
    });

    it('create expected files', function(done) {
      runGen.withOptions(options).withPrompt({jslib: [], gem: []})
      .on('end', function() {

        assert.file([].concat(
          expected
        ));

        assert.noFile([
          'bower.json',
          'Gemfile'
        ]);

        assert.fileContent([
          ['package.json', /"name": "tmp"/]
        ]);

        assert.noFileContent([
          ['gulpfile.coffee', /require: ['bourbon']/],
          ['gulpfile.coffee', /bundleExec: true/]
        ]);

        done();
      });
    });

    it('create expected bower files', function(done) {
      runGen.withOptions(options).withPrompt({jslib: ['jquery'], gem: []})
      .on('end', function() {

        assert.file([].concat(
          expected,
          'bower.json'
        ));

        assert.fileContent([
          ['bower.json', /"name": "tmp"/],
          ['bower.json', /jquery/]
        ]);

        assert.noFileContent([
          ['bower.json', /three\.js/]
        ]);

        done();
      });
    });

    it('create expected Gem files', function(done) {
      runGen.withOptions(options).withPrompt({jslib: [], gem: ['bourbon', 'breakpoint']})
      .on('end', function() {

        assert.file([].concat(
          expected,
          'Gemfile'
        ));

        assert.fileContent([
          ['Gemfile', /gem "bourbon"/],
          ['Gemfile', /gem "breakpoint"/],
          ['gulpfile.coffee', /require: \['bourbon','breakpoint'\]/],
          ['gulpfile.coffee', /bundleExec: true/]
        ]);

        done();
      });
    });
  });
});

