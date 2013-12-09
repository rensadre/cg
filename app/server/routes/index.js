var content = require('./content');

function checkAuth(req, res, next) {
	if (!req.session.user_id) {
		res.send('You are not authorized to view this page');
	} else {
		next();
	}
}

module.exports = function(app) {
	app.get('/cg', content.getMain);

	app.get('/my_secret_page', checkAuth, function (req, res) {
		res.send('if you are viewing this page it means you are logged in');
	});

	app.post('/login', function (req, res) {
		// var post = req.body;
		// if (post.user == 'john' && post.password == 'johnspassword') {
		// 	req.session.user_id = johns_user_id_here;
		// 	res.redirect('/my_secret_page');
		// } else {
		// 	res.send('Bad user/pass');
		// }
		console.log('req->', req);
		var post = true;
		if (post) {
			req.session.user_id = 'johns_user_id_here';
			res.redirect('/my_secret_page');
		} else {
			res.send('Bad user/pass');
		}
	});

	app.get('/logout', function (req, res) {
		delete req.session.user_id;
		res.redirect('/login');
	});
};

// module.exports = function(app) {
// 	app.get('/uSavings/:uId/:aId', content.getUS);
// 	app.post('/uSavings/:uId/:aId', content.setUS);
// };

// {
//   "HOST": "mysql.kiberpole",
//   "USER": "root",
//   "PASSWORD": "1234",
//   "DATABASE": "isys",
//   "BIG_NUMBER_STRINGS": true,
//   "SUPPORT_BIG_NUMBERS": true,

//   "IS_A_NUMBER": "^\\d+$",
//   "IS_IN_RANGE": "^\\d{18,23}$",

//   "PANEL_FIELDS_Q": 17
// }