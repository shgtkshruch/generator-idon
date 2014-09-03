var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  app: function() {
    this.copy('index.html', 'src/index.html');
    this.copy('style.scss', 'src/styles/style.scss');
  },

  gulp: function() {
    this.copy('package.json', 'package.json');
    this.copy('gulpfile.coffee', 'gulpfile.coffee');
  }
});
