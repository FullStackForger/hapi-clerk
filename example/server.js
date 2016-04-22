const Hapi = require('hapi');
const Hoek = require('hoek');

const defaults = require('./../defaults');
const clerk = require('./../');

// predefined topic identified by code
const topics = [{
	"code": "test.jewelines",
	"required": false,
	"info": "Early access: Jewelines - Color Matching Puzzle Game"
}, {
	"code": "news.internal",
	"required": false,
	"info": "News: IndieForger games"
}, {
	"code": "news.reviews",
	"required": false,
	"info": "News: game reviews"
}];

const config = Object.assign({}, defaults, { topics: topics,  });
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
		database: config.database,
		topics: config.topics
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