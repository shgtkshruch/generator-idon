var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  app: function() {
    this.copy('index.html', 'src/index.html');
    this.copy('style.scss', 'src/style/style.scss');
  }
});
