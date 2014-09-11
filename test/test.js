var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');

describe('Yo idon generator', function() {
  describe('Run test', function() {

    var options = {
      'skip-install': true,
      'bower-install': false,
      'npm-install': false
    };

    var expected = [
      'src/index.jade',
      'src/styles/style.scss',
      'src/scripts/script.coffee',
      '.gitignore',
      'package.json',
      'gulpfile.coffee',
      'github-pages.sh'
    ];

    var runGen;

    beforeEach(function() {
      runGen = helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, '.tmp'));
    });

    it('create expected files', function(done) {
      runGen.withOptions(options).withPrompt({jslib: [], sasslib: []})
      .on('end', function() {

        assert.file([].concat(
          expected
        ));

        assert.noFile([
          'bower.json'
        ]);

        assert.fileContent([
          ['package.json', /"name": "tmp"/],
          ['src/index.jade', /title tmp/]
        ]);

        assert.noFileContent([
          ['src/styles/style.scss', /bower:scss/]
        ]);

        done();
      });
    });

    it('create expected bower files', function(done) {
      runGen.withOptions(options).withPrompt({jslib: ['jquery'], sasslib: ['bourbon']})
      .on('end', function() {

        assert.file([].concat(
          expected,
          'bower.json'
        ));

        assert.fileContent([
          ['bower.json', /"name": "tmp"/],
          ['bower.json', /jquery/],
          ['bower.json', /bourbon/],
          ['src/styles/style.scss', /bower:scss/]
        ]);

        done();
      });
    });

  });
});

