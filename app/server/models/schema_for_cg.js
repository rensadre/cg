var mongoose = require('mongoose');

var fs = require('fs');
var conf = JSON.parse(fs.readFileSync('./config.json'));

// var MySQL = require('mysql');
// var mysql = MySQL.createConnection({
// 	host: conf['HOST'],
// 	user: conf['USER'],
// 	password: conf['PASSWORD'],
// 	database: conf['DATABASE'],
// 	bigNumberStrings: conf['BIG_NUMBER_STRINGS'],
// 	supportBigNumbers: conf['SUPPORT_BIG_NUMBERS']
// });

// var oJson = JSON.parse(fs.readFileSync('./models/default.json'));

// var Schema = mongoose.Schema;
// var ObjectId = Schema.Types.ObjectId;
// var Mixed = Schema.Types.Mixed;

// module.exports.objId = mongoose.Types.ObjectId;

// var USSchema = new Schema( {
// 	u: {type: String, required: true, notEmpty: true, index: true},
// 	j: {type: Mixed, required: true, notEmpty: true}
// }, {
// 	collection: 'uSavings'
// });
// USSchema.statics = {
// 	getJson: getUserJson,
// 	setJson: setUserJson
// };
// mongoose.model('uSavings', USSchema);

// function isJsonValid(objJson) {
// 	var hasData = 
// 		'object' === typeof objJson &&
// 		'object' === typeof objJson.applications &&
// 		'number' === typeof objJson.applications.length &&
// 		conf['PANEL_FIELDS_Q'] == objJson.applications.length;

// 	if (! hasData) return 1;

// 	for (var i in objJson.applications) {
// 		var good =
// 			'name' in objJson.applications[i] &&
// 			'string' === typeof objJson.applications[i].name &&
// 			0 < objJson.applications[i].name.length &&

// 			'variant' in objJson.applications[i] &&
// 			'string' === typeof objJson.applications[i].variant &&
// 			0 < objJson.applications[i].variant.length &&

// 			'signature' in objJson.applications[i] &&
// 			'string' === typeof objJson.applications[i].signature &&
// 			0 <= objJson.applications[i].signature.length &&

// 			'parameters' in objJson.applications[i] &&
// 			'object' === typeof objJson.applications[i].parameters &&

// 			'hint' in objJson.applications[i] &&
// 			'string' === typeof objJson.applications[i].hint &&
// 			0 <= objJson.applications[i].hint.length;

// 		if (! good) return 2;
// 	}

// 	return 0;
// }

// function getUserJson(self, uId, aId, callback) {
// 	mysql.query('SELECT * FROM ?? WHERE ?? = ?', [ 'users', 'userId', aId ], function (err, data) {
// 		if (err) {
// 			callback(new Error('getUserJson()\'s connection error while checking whether the asking person exists'));
// 			return;
// 		}
// 		if (0 == data.length) {
// 			callback(new Error('getUserJson()\'s asking person doesn\'t exist'));
// 			return;
// 		}
// 		if (uId.toString() !== data[0]['userId'].toString()) {
// 			callback(new Error('getUserJson()\'s asking person doesn\'t match to the user\'s id'));
// 			return;
// 		}

// 		self.find({u: uId}).exec(function(e, d) {
// 			if (e) {
// 				callback(new Error('getUserJson() Error: ' + e));
// 				return;
// 			}
// 			if (null === d) {
// 				callback(new Error('getUserJson() data is null: ' + d));
// 				return;
// 			}
// 			if (0 < d.length) {
// 				callback(d[0]['j']);
// 				return;
// 			}

// 			setUserJson(self, uId, aId, oJson, callback);
// 		});
// 	});
// }

// function setUserJson(self, uId, aId, uJson, callback) {
// 	mysql.query('SELECT * FROM ?? WHERE ?? = ?', [ 'users', 'userId', aId ], function (err, data) {
// 		if (err) {
// 			callback(new Error('setUserJson()\'s connection error while checking whether the asking person exists'));
// 			return;
// 		}
// 		if (0 == data.length) {
// 			callback(new Error('setUserJson()\'s asking person doesn\'t exist'));
// 			return;
// 		}
// 		if (uId.toString() !== data[0]['userId'].toString()) {
// 			callback(new Error('setUserJson()\'s asking person doesn\'t match to the user\'s id'));
// 			return;
// 		}
// 		var validationError = isJsonValid(uJson);
// 		if (0 != validationError) {
// 			callback(new Error(validationError));
// 			return;
// 		}

// 		self.find({u: uId}).exec(function(er, da) {
// 			if (er) {
// 				callback(new Error('setUserJson() Error: ' + er));
// 				return;
// 			}
// 			if (null === da) {
// 				callback(new Error('setUserJson() data is null: ' + da));
// 				return;
// 			}
// 			if (0 < da.length) {
// 				self.findOne({u: uId}, function(err, dat) {
// 					dat.j = uJson;
// 					dat.save(callback);
// 				});
// 				return;
// 			}

// 			new self( {
// 				u: uId,
// 				j: uJson
// 			}).save(function(e, d) {
// 				if (e) {
// 					callback(new Error('setUserJson() Error: ' + e));
// 					return;
// 				}
// 				callback(null);
// 				return;
// 			});
// 		});
// 	});
// }