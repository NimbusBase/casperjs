console.log('\'Allo \'Allo!');

casper = require('casper').create();

casper.test.begin('Casper Test for enterprise', 4, (test)->
    
	#  open server page
	casper.start("http://nimbusbase.github.io/enterprise/", ()->
		test.assertExists('#google_login', "login button located")

		# click login btn
		this.mouse.click('#google_login')
	)


	# wait for redirect to enter password or accept permission query
	casper.then(()->
		# retrive title
		title = this.getTitle();
		return if title is 'enterprise framework'
			# logined already, skip to next
		
		login_form = test.assertExists('form#gaia_loginform');
		if ((title == '登录 - Google 帐户' or 'Sign in - Google Accounts') and login_form) 
			test.fill('form#gaia_loginform',
				Email : 'release@nimbusbase.com'
				Passwd : 'freethecloud2013'
			,true)
			test.ok('Filled in with test account and submitted')
		

	)

	casper.then(()->
		# accept permission
		title = this.getTitle();
		if title is "Request for Permission"
			this.mouse.click('#submit_approve_access')
			test.ok('Granted permission')
		
	)

	# wait for redirect back
	casper.then(()->
		# check for authorized
		authed = Nimbus.Auth.authorized();
		test.assertEquals(authed,true,'Login succeed');
		test.done()
	)

	# done when login finish


	casper.run()

	return
)

