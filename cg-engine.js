"use strict";

(function(){
	var fs = require('fs');
	
	var conf, confJson = './config.json';
	try {
		conf = JSON.parse(fs.readFileSync(confJson));
	}
	catch (ex) {
		console.error('%s:\n\tCouldn\'t read config file "%s"\n', __filename, confJson);
		console.dir(ex);
		process.exit(1);
	}

	var express = require('./app/server/node_modules/express');
	var app = express();
	var RedisStore = require('connect-redis')(express);

	var rs = new RedisStore({
		host: 'localhost',
		port: 6379,
		db: 2,
		pass: 'RedisPASS'
	});

	app.set('showStackError', true);
	app.set('views', __dirname + '/app/server/views');
	app.set('view engine', 'jade');

	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({secret: 'CGEngine001TopSecret', store: rs }));

	var allowCrossDomain = function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		next();
	};
	app.use(allowCrossDomain);

	app.use(express.session({secret: 'This is a secret'}));

	app.use(app.router);

	app.use(express.static(__dirname + '/app/public'));
	app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));

	require('./app/server/routes')(app);

	app.listen(Number(conf.port));
})();