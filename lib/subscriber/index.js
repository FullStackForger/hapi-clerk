'use strict';
const Joi = require('joi');
const routes = require('./routes');
const optsSchema = Joi.object({
	topics: Joi.array().items(Joi.object({
		code: Joi.string().required(),
		info: Joi.string().required(),
		required: Joi.boolean().default(false)
	}))
})

const plugins = [
	require('hapi-auth-jwt2')
];

exports.register = function (server, options, next) {
	const validation = Joi.validate(options, optsSchema);
	if (validation.error) return next(validation.error);

	server.register(plugins, function (error) {
		if (error) return next(error);
		server.route(routes);
		next();
	});
};

exports.register.attributes = {
	name: 'user'
};