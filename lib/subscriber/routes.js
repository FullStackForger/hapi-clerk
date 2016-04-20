'use strict';
const routes = {};
routes.default = {
	auth: false,
	handler: function (request, reply) {
		reply({
			method: request.method,
			info: request.info,
			path: request.path,
			query: request.query,
			params: request.params,
			auth: request.auth
		})
	}
};

module.exports = [
	// user endpoints
	{ path: '/user/{userId}/subscription', method: 'GET', config: routes.default }, // > topics: [{}, {}, {}]
	{ path: '/user/{userId}/subscription', method: 'PUT', config: routes.default }  // < topics: [x, y, z]
];


