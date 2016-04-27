'use strict';
const Boom = require('boom');
const Subscriber = require('./model');

module.exports = [
	{ path: '/topics', method: 'GET', config: { handler: getTopics }},
	{ path: '/user/{userId}/topics', method: 'GET', config: { handler: getUserTopics } },
	{ path: '/user/{userId}/topics', method: 'PUT', config: { handler: putUserTopics } }
];

function getTopics(request, reply) {
	reply(reply.realm.pluginOptions.topics)
}

function getUserTopics(request, reply) {
	let userId = request.params.userId;
	Subscriber.findById(userId).then((user) => {
		if (user === null) {
			reply(Boom.notFound('User not found', new Error('User id: ' + userId + ' was not found.')))
		}
		reply(user.toObject().topics)
	}).catch((err) => {
		reply(Boom.badImplementation('Server error', err))
	});
}

function putUserTopics(request, reply) {
	let userId = request.params.userId;
	let topics = reply.realm.pluginOptions.topics.map((topic) => topic.code);
	let reqTopics = request.payload.topics || [];

	let allowed = reqTopics.reduce(function(prev, curr) {
		return prev && topics.indexOf(curr) > -1;
	}, true)
	if (!allowed) {
		return reply(Boom.forbidden('Illegal topic codes'));
	}

	// upsert user, source: http://stackoverflow.com/a/7855281/6096446
	var subscriber = new Subscriber({ topics: topics });
	var upsertData = subscriber.toObject();
	delete upsertData._id;

	Subscriber.update({_id: userId}, upsertData, { upsert: false }, function(err, user) {
		if (err) {
			return reply(Boom.badImplementation('Server error', err));
		}
		if (!user) {
			return reply(Boom.notFound(`User doesn't exist`,  new Error('User id: ' + userId + ' was not found.')));
		}
		reply({ success: true });
	});
}