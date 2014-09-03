var helpers = require('yeoman-generator').test;
var path = require('path');


describe('CSS generator', function() {
  describe('Run test', function() {
    var runGen;

    beforeEach(function() {
      runGen = helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, '.tmp'))
    });

    it('create expected files', function(done) {
      runGen.on('end', function() {
        done();
      });
    });

  });
});
