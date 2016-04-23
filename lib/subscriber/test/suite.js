'use strict';
const Code = require('code');
const Hapi = require('hapi');
const JWT = require('jsonwebtoken');

const Mongoose = require('mongoose');
const Moment = require('moment');

const Plugin = require('../');
const Subscriber = require('../model');

const mocks = require('./mocks.js');

const sinon = require('sinon');
const expect = Code.expect;
const suite = module.exports = {};


suite.server = null;

suite.setupServer = function (next) {
	const plugin = { register: Plugin, options: mocks.pluginOptions };
	const connection = { labels: 'api' };

	suite.server = new Hapi.Server({ debug: false });
	suite.server.connection(connection);
	suite.server.register(plugin, (err) => {
		next(err);
	});
};

suite.mockDB = function () {

	//mongoose.Collection.prototype.insert
	//mongoose.Collection.prototype.save
	//mongoose.Collection.prototype.insert
	//mongoose.Collection.prototype.findOne

}

suite.unmockDB = function () {

}

suite.header = {};

suite.header.getJWTAuthorization = function (user) {
	return JWT.sign({
		sub: user._id,
		iat: Moment().unix(),
		exp: Moment().add(14, 'days').unix()
	}, mocks.pluginOptions.token.secret);
};

suite.db = {};