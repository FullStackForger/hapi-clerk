// --------------------------------------------------------------------
// Important!
// Do not modify this file.
// Check README.md for more details on how to configure this package.
// --------------------------------------------------------------------
"use strict";
var fs = require('fs');
var configJSONPath = 'config.json';
var Hoek = require('hoek');
var config = {
	server: {
		host: process.env.PORT || 'localhost',
		port: process.env.HOST || 8080
	},
	database: {
		host: process.env.MONGO_HOST || '127.0.0.1',
		port: process.env.MONGO_PORT || 27017,
		db: process.env.MONGO_DB || 'hapi-subscriber',
		username: process.env.MONGO_HOST || '',
		password: process.env.MONGO_HOST || ''
	},
	topics: []
};

try {
	let options = JSON.parse(fs.readFileSync(configJSONPath, 'utf8'));
	config = Hoek.applyToDefaults(config, options);
} catch (e) {
	config = Hoek.applyToDefaults(config, {});
}

module.exports = config;