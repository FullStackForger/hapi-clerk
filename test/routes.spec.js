'use strict';
// Test suite
const Hapi = require('hapi');
const Code = require('code');
const Hoek = require('hoek');
const Lab = require('lab');

// Helpers
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const before = lab.before;
const beforeEach = lab.beforeEach;
const afterEach = lab.afterEach;
const after = lab.after;
const it = lab.it;
const expect = Code.expect;

// Internals
const proxyquire = require('proxyquire').noCallThru();
const mockPluginOpts = {
	topics: [{
		code: 'tac',
		info: 'Terms and Conditions',
		required: false
	}]
}


let server;

// Subscriber stub model mock (prevents db connection)
let SubscriberStub = function (obj) {
	let self = this;
	self._id = obj._id;
	self.topics = obj.topics;
	self.toObject = function () {
		return {
			_id: self.id,
			topics: self.topics
		}
	}
};

// setup server mocking subscriber model
before(function (next) {
	let Routes = proxyquire('../lib/subscriber/routes', { './model': SubscriberStub });
	let routePlugin = function (srv, opts, next ) {
		srv.route(Routes);
		next();
	};
	routePlugin.attributes = { name: 'routes' };

	server = new Hapi.Server({debug: false});
	server.connection( { labels: 'api' });
	server.register({ register: routePlugin, options: mockPluginOpts })

	next();
});

describe('GET /topics', function () {

	it('should reply (200) with subscription topics', (done) => {
			server.inject({ method: 'GET', url: '/topics' }, (res) => {
				expect(res.statusCode).to.equal(200);
				expect(res.payload).to.exist();
				expect(res.result).to.exist();
				expect(res.result).to.equal(mockPluginOpts.topics);
				done();
			});
		});
});

describe('GET /user/{userId}/topics', function () {

	it('should reply (200) with subscription topics', (done) => {
		let userId = '123qwe123asd123zxc123';
		let topics = ['qwe', 'asd'];

		SubscriberStub.findById = function () {
			return new Promise(function(resolve, reject) {
				resolve({ toObject: () => ({ topics: topics}) })
			});
		};

		server.inject({ method: 'GET', url: `/user/${userId}/topics` }, (res) => {
			expect(res.statusCode).to.equal(200);
			expect(res.result).to.exist();

			done();
		});
	});

	it('should reply (500) with implementation error', (done) => {
		let userId = '123qwe123asd123zxc123';

		SubscriberStub.findById = function () {
			return new Promise(function(resolve, reject) {
				reject(new Error("Expected implementation error."))
			})
		}

		server.inject({ method: 'GET', url: `/user/${userId}/topics` }, (res) => {
			expect(res.statusCode).to.equal(500);
			done();
		});
	});


	it('should reply with 404 for invalid user', (done) => {
		let userId = '123qwe123asd123zxc123';
		let topics = ['qwe', 'asd'];

		SubscriberStub.findById = function () {
			return new Promise(function(resolve, reject) {
				resolve(null);
			});
		};

		server.inject({ method: 'GET', url: `/user/${userId}/topics` }, (res) => {
			expect(res.statusCode).to.equal(404);

			done();
		});
	});

});

describe('PUT /user/{userId}/topics', function () {

	it('should reply (200) with subscription topics', (done) => {
		let userId = '123qwe123asd123zxc123';
		let payload = { topics: ['tac']}

		SubscriberStub.update = function (selector, data, options, callback) {
			callback(null,  { id: 123 })
		}

		server.inject({ method: 'PUT', url: `/user/${userId}/topics`, payload }, (res) => {
			expect(res.statusCode).to.equal(200);
			done();
		});
	});

	it('should reply with 403 invalid topic', (done) => {
		let userId = '123qwe123asd123zxc123';
		let payload = { topics: ['invalid']}

		server.inject({ method: 'PUT', url: `/user/${userId}/topics`, payload }, (res) => {
			expect(res.statusCode).to.equal(403);
			done();
		});
	});


	it('should reply with 404 for invalid user', (done) => {
		let userId = '123qwe123asd123zxc123';
		let payload = { topics: ['tac']}

		SubscriberStub.update = function (selector, data, options, callback) {
			callback(null, null)
		}

		server.inject({ method: 'PUT', url: `/user/${userId}/topics`, payload }, (res) => {
			expect(res.statusCode).to.equal(404);
			done();
		});
	});

});