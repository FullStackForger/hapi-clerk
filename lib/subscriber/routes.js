'use strict';
const Boom = require('boom');
const Subscriber = require('./model');
const routes = {};

module.exports = [
	{ path: '/topics', method: 'GET', config: { auth: false, handler: getTopics }}
];

function handleDefault (request, reply) {
	reply({
		method: request.method,
		info: request.info,
		path: request.path,
		query: request.query,
		params: request.params,
		auth: request.auth
	})
}

function getTopics(request, reply) {
	reply(reply.realm.pluginOptions.topics)
}