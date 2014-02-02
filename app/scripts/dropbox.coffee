casper = require('casper').create()

casper.test.begin('Casper Test for enterprise', 4, (test)->
  casper.start("http://jellyreader.com/", ()->
      test.assertExists('#login_dropbox', "login button located")

      #click login btn
      this.mouse.click('#login_dropbox')
  )
  
  
  # login
  casper.then(()->
    # retrive title
    title = this.getTitle();
    return if title is 'JellyReader - RSS Reader on Personal Clouds'
      # logined already, skip to next

    login_form = test.assertExists('form[action="/login"]');
    if ((title is 'Dropbox - 登录' or 'Dropbox - Sign in') and login_form)
        this.fill('form#gaia_loginform',
            login_email : 'release@nimbusbase.com'
            login_password : 'freethecloud2013'
        ,true)
        test.ok('Filled in with test account and submitted')

  )

  return
)
