'use strict';
const Boom = require('boom');
const Subscriber = require('./model');
const routes = {};

module.exports = [
	{ path: '/topics', method: 'GET', config: { auth: false, handler: getTopics }}, 			// > topics: [{}, {}, {}]
	{ path: '/user/{userId}/topics', method: 'GET', config: { auth: false, handler: getUserTopics } }, // > topics: [{}, {}, {}]
	//{ path: '/user/{userId}/topics', method: 'GET', config: { auth: 'jwt', handler: handleDefault } }, // > topics: [{}, {}, {}]
	{ path: '/user/{userId}/topics', method: 'PUT', config: { auth: false, handler: putUserTopics } }  // < topics: [x, y, z]
	//{ path: '/user/{userId}/topics', method: 'PUT', config: { auth: 'jwt', handler: handleDefault } }  // < topics: [x, y, z]
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

function getUserTopics(request, reply) {
	//let userId = request.auth.credentials.user._id
	let userId = request.params.userId
	Subscriber.findById(userId).then((user) => {
		if (user === null) {
			reply(Boom.notFound('User not found', new Error('User id: ' + userId + ' was not found.')))
		}
		reply(user.toObject().topics)
	}).catch((err) => reply(Boom.badImplementation('Server error', err)));
}

function putUserTopics(request, reply) {
	//let userId = request.auth.credentials.user._id
	let userId = request.params.userId


	// upsert user, source: http://stackoverflow.com/a/7855281/6096446
	var subscriber = new Subscriber({
		topics: request.payload.topics || []
	});
	var upsertData = subscriber.toObject();
	delete upsertData._id;

	Subscriber.update({_id: userId}, upsertData, { upsert: true }, function(err, user) {
		if (err) return reply(Boom.badImplementation('Server error', err));
		if (!user) return reply(Boom.notFound(`User doesn't exist`,  new Error('User id: ' + userId + ' was not found.')));

		reply({ success: true });
	});
}