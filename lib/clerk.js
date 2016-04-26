'use strict'
const Joi = require('joi');

const internals = {};

exports.register = function (server, options, next) {
	const validation = Joi.validate(options, internals.optsSchema);
	if (validation.error) return next(validation.error);

	const plugins = [{
		register: require('./db/index'),
		options: options.database
	},{
		register: require('./subscriber/index'),
		options: {
			topics: options.topics
		}
	}]

	server.register(plugins, (err) => next(err));
}

exports.register.attributes = {
	pkg: require('./../package.json')
};

internals.optsSchema = Joi.object({
	database: Joi.object().required(),
	topics: Joi.array().items(Joi.object()).required()
});