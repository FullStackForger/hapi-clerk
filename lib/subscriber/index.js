'use strict';
const Joi = require('joi');

const jwtAuth = require('./auth-jwt');
const routes = require('./routes');

const schema = Joi.object({
	token: Joi.object({
		secret: Joi.string().required(),
		algorithms: Joi.array().items(Joi.string()).default(['HS256'])
	}),
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
	const validation = Joi.validate(options, schema);
	if (validation.error) return next(validation.error);

	server.register(plugins, function (error) {
		if (error) return next(error);

		server.auth.strategy('jwt', 'jwt', {
			key: options.token.secret,
			validateFunc: jwtAuth.validate,
			verifyOptions: { algorithms: options.token.algorithms }
		});

		server.route(routes);
		next();
	});
};

exports.register.attributes = {
	name: 'user'
};