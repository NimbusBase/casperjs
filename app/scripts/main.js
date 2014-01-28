console.log('\'Allo \'Allo!');

var casper = require('casper').create();

casper.test.begin('Casper Test for enterprise', 4, function(test) {
    
	// open server page
	casper.start("http://nimbusbase.github.io/enterprise/", function() {
		test.assertExists('#google_login', "login button located");

		//click login btn
		this.mouse.click('#google_login');
	});


	// wait for redirect to enter password or accept permission query
	casper.then(function(){
		// retrive title
		var title = this.getTitle();
		if (title == 'enterprise framework') {
			// logined already, skip to next
			return;
		};

		var login_form = test.assertExists('form#gaia_loginform');
		if ((title == '登录 - Google 帐户'|| 'Sign in - Google Accounts') && login_form) {
			test.fill('form#gaia_loginform',{
				Email : 'release@nimbusbase.com',
				Passwd : 'freethecloud2013'
			},true);
			test.ok('Filled in with test account and submitted');
		};

	});

	casper.then(function(){
		// accept permission
		var title = this.getTitle();
		if (title == "Request for Permission") {
			this.mouse.click('#submit_approve_access');
			test.ok('Granted permission');
		};
	});

	// wait for redirect back
	casper.then(function(){
		// check for authorized
		var authed = Nimbus.Auth.authorized();
		test.assertEquals(authed,true,'Login succeed');
		test.done();
	});

	// done when login finish


	casper.run();
});

