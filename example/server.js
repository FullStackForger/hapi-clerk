const Hapi = require('hapi');
const Hoek = require('hoek');

const defaults = require('./../defaults');
const clerk = require('./../');

// predefined topic identified by code
const topics = [{
	"code": "G.JEWEL",
	"required": false,
	"info": "Jewelines - Color matching puzzle game"
}, {
	"code": "N.INTERNAL",
	"required": false,
	"info": "Newsletter: IndieForger games"
}, {
	"code": "N.GAMES",
	"required": false,
	"info": "Newsletter: game reviews"
}];

const config = Object.assign({}, defaults, { topics: topics });
const server = new Hapi.Server();
const connection = {
	host: config.server.host,
	port: config.server.port,
	routes: {
		cors: true
	}
};

const plugins = [{
	register: clerk,
	options: {
		auth: config.auth,
		database: config.database
	}
}];

server.connection(connection);
server.register(plugins, (err) => {
	if (err) throw err;

	// Log incoming request
	server.ext('onRequest', function (request, reply) {
		console.log(request.path, request.query);
		return reply.continue();
	});

	// Log 500 errors
	server.on('request-error', (request, err) => {
		console.log(`Error (500), reques id: ${request.id}, message: ${err.message}`);
		console.log(err.stack);
	});

	server.start((err) => {
		if (err) throw err;
		console.log('Server running at:', server.info.uri);
	});
});