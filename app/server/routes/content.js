var mongoose = require('mongoose');
var schema = require('../models/schema_for_cg.js');
var path = require("path");
var fs = require('fs');

var conf = JSON.parse(fs.readFileSync(path.resolve('.') + '/config.json'));

var strHost = conf.mongo.host,
	strDB = conf.mongo.db;

mongoose.connect('mongodb://' + strHost + '/' + strDB);

exports.getMain = function(req, res) {
	// res.render(path.resolve('.') + '/server/views/index', {
	res.render('index', {
		pageTitle:'Simple Express 3 and Jade example'
	});
};

// exports.getUS = function(req, res) {
// 	var reg = new RegExp(conf['IS_A_NUMBER']);

// 	if (undefined === req.params.uId) {
// 		res.json(new Error('getUS() hasn\'t got the parameter of \'uId\''));
// 		return;
// 	}

// 	var strUId = req.params.uId;
// 	var isValid =
// 		reg.test(strUId) &&
// 		null !== strUId.toString().match(new RegExp(conf['IS_IN_RANGE']));

// 	if (! isValid) {
// 		res.json(new Error('getUS()\'s parameter of \'uId\' is an invalid'));
// 		return;
// 	}

// 	if (undefined === req.params.aId) {
// 		res.json(new Error('getUS() hasn\'t got the parameter of \'aId\''));
// 		return;
// 	}

// 	var strAId = req.params.aId;
// 	isValid =
// 		reg.test(strAId) &&
// 		null !== strAId.toString().match(new RegExp(conf['IS_IN_RANGE']));

// 	if (! isValid) {
// 		res.json(new Error('getUS()\'s parameter of \'aId\' is an invalid'));
// 		return;
// 	}

// 	var fCallback = function(data) {
// 		res.json(data);
// 	};

// 	var oUserSavings = mongoose.model('uSavings');
// 	oUserSavings.getJson(oUserSavings, strUId, strAId, fCallback);
// };

// exports.setUS = function(req, res) {
// 	var reg = new RegExp(conf['IS_A_NUMBER']);

// 	if (undefined === req.params.uId) {
// 		res.json(new Error('setUS() hasn\'t even got the parameter of \'uId\''));
// 		return;
// 	}

// 	var strUId = req.params.uId;
// 	var isValid =
// 		reg.test(strUId) &&
// 		null !== strUId.toString().match(new RegExp(conf['IS_IN_RANGE']));

// 	if (! isValid) {
// 		res.json(new Error('setUS()\'s parameter of \'uId\' is an invalid').toString());
// 		return;
// 	}

// 	if (undefined === req.params.aId) {
// 		res.json(new Error('getUS() hasn\'t got the parameter of \'aId\''));
// 		return;
// 	}

// 	var strAId = req.params.aId;
// 	isValid =
// 		reg.test(strAId) &&
// 		null !== strAId.toString().match(new RegExp(conf['IS_IN_RANGE']));

// 	if (! isValid) {
// 		res.json(new Error('getUS()\'s parameter of \'aId\' is an invalid'));
// 		return;
// 	}

// 	if (undefined === req.body) {
// 		res.json(new Error('setUS() hasn\'t even got the \'req.body\' at all'));
// 		return;
// 	}

// 	var strUJ = req.body;

// 	var fCallback = function(data) {
// 		res.json(data);
// 	};

// 	var oUserSavings = mongoose.model('uSavings');
// 	oUserSavings.setJson(oUserSavings, strUId, strAId, strUJ, fCallback);
// };