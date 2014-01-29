var casper = require('casper').create();

casper.test.begin('Casper Test for enterprise', 4, function(test) {
  casper.start("http://jellyreader.com/", function() {
      test.assertExists('#login_dropbox', "login button located");

      //click login btn
      this.mouse.click('#login_dropbox');
  });
  
  
  // login
  casper.then(function(){
        // retrive title
        var title = this.getTitle();
        if (title == 'JellyReader - RSS Reader on Personal Clouds') {
          // logined already, skip to next
           return;
        };

        var login_form = test.assertExists('form[action="/login"]');
        if ((title == 'Dropbox - 登录'|| 'Dropbox - Sign in') && login_form) {
            test.fill('form#gaia_loginform',{
                login_email : 'release@nimbusbase.com',
                login_password : 'freethecloud2013'
            },true);
             test.ok('Filled in with test account and submitted');
        };

  });
}
