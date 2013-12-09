#!/usr/bin/env node

(function () {
	'use strict';

	var http = require('http'),
		url = require('url'),
		util = require('util'),
		fs = require('fs'),
		_ = require('underscore'),
		child_process = require('child_process');

	var conf_json = 'cg-engine-manager.json',
		config = undefined;

	fs.writeFile('' + require.main.filename + '.pid', '' + process.pid + '\n');

	try {
		config = JSON.parse(fs.readFileSync(conf_json));
	}
	catch (ex) {
		console.error(
			'%s:\n\tCan not read config file "%s"\n',
			__filename,
			conf_json
		);
		console.dir(ex);
		process.exit(1);
	}

	var exitingNow = false;

	var apps_terminate = function () {
		exitingNow = true;

		if (status_timer) {
			clearTimeout(status_timer);
			fs.unlink(config.status.pathname, function (err) {});
		};

		config.apps.forEach(function (app_conf) {
			app_stop.bind(app_conf)();
		});
	};

	var app_stop = function () {

		if (this.restart_timer) {
			clearTimeout(this.restart_timer);
			delete this.restart_timer;
		};

		if (this.child) {
			console.log('TERM to ' + this.pathname);
			this.child.kill();

			this.term_timeout = setTimeout(function () {
				if (this.child) {
					console.log('KILL to ' + this.pathname);
					this.child.kill(9);
				}
			}.bind(this), config.term_timeout);
		};
	};

	var app_start = function () {

		if (this.disabled)
			return;

		if (this.child != undefined)
			return;

		console.log('app-manager: Starting ' + this.pathname);

		if (this.restart_timer) {
			clearTimeout(this.restart_timer);
			delete this.restart_timer;
		};

		this.child = child_process.fork(this.pathname, null, { });

		this.start_ms = new Date().getTime();
		this.stop_ms = undefined;

		this.child.once('exit', function (code, signal) {

			this.stop = new Date().getTime();

			if (this.child) {
				if (signal == null && code) {
					signal = (code & 127);
					code = (code >> 8);
				};

				console.log('app-manager: "%s" terminated w/code %d, signal %s',
					this.pathname, code, signal);

				delete this.child;

				if (exitingNow != true) {
					this.restart_timer = setTimeout(function () {
						delete this.restart_timer;
						app_start.bind(this)();
					}.bind(this),
					config.restart_delay);
				};
			}

			if (this.term_timeout) {
				clearTimeout(this.term_timeout);
				delete this.term_timeout;
			};
		}.bind(this));

		this.child.on('message', function (msg) {
			console.log(
				'app-manager: Message:\n' +
				'	child:\n' + util.inspect(this, { depth: 0, colors: true }) + '\n' +
				'	content:\n' + util.inspect(msg, { depth: 3, colors: true }) + '\n'
			);
		}.bind(this));

	};

	process.on('exit', apps_terminate);
	process.on('SIGINT', apps_terminate);
	process.on('SIGTERM', apps_terminate);

	process.on('message', function () {
		this.child.on('message', function (msg) {
			var str = util.format.apply(this, msg);
			var strTs = strftime('%d %b %Y %T %Z', new Date());
			console.log('%s %s: %s', strTs, this.pathname, str);
		}.bind(this));
	});

	config.apps.forEach(function (app_conf) {
		app_start.bind(app_conf)();
	});

	var status_timer;

	if (config.status.write_interval) {
		status_timer = setInterval(function () {
			var status = [ ];

			config.apps.forEach(function (app_conf) {
				status.push({
					'app': app_conf.pathname,
					'pid': (app_conf.child ? app_conf.child.pid : undefined),
					'start': app_conf.start
				});
				fs.writeFile(config.status.pathname,
					JSON.stringify(status, null, 4),
					{ encoding: 'utf8' },
					function (err) {
						if (err) { console.warn(err); };
					}
				);
			});

		}, config.status.write_interval);
	}

})();