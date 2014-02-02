// Generated by CoffeeScript 1.6.3
var casper;

casper = require('casper').create();

casper.test.begin('Casper Test for enterprise', 4, function(test) {
  casper.start("http://jellyreader.com/", function() {
    test.assertExists('#login_dropbox', "login button located");
    return this.mouse.click('#login_dropbox');
  });
  casper.then(function() {
    var login_form, title;
    title = this.getTitle();
    if (title === 'JellyReader - RSS Reader on Personal Clouds') {
      return;
    }
    login_form = test.assertExists('form[action="/login"]');
    if ((title === 'Dropbox - 登录' || 'Dropbox - Sign in') && login_form) {
      this.fill('form#gaia_loginform', {
        login_email: 'release@nimbusbase.com',
        login_password: 'freethecloud2013'
      }, true);
      return test.ok('Filled in with test account and submitted');
    }
  });
});
