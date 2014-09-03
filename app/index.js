var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  app: function() {
    this.copy('index.jade', 'src/index.jade');
    this.copy('style.scss', 'src/styles/style.scss');
    this.copy('script.coffee', 'src/scripts/script.coffee');
  },

  gulp: function() {
    this.copy('package.json', 'package.json');
    this.copy('gulpfile.coffee', 'gulpfile.coffee');
  }
});
