'use strict';
const Code = require('code');
const Hoek = require('hoek');
const Lab = require('lab');

// Internals
const Suite = require('./test/suite');
const Sinon = require('sinon');
const mocks = require('./test/mocks');
const pluginOpts = mocks.pluginOptions;
const subscriber = mocks.subscriber;

// Helpers
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const before = lab.before;
const beforeEach = lab.beforeEach;
const afterEach = lab.afterEach;
const after = lab.after;
const it = lab.it;
const expect = Code.expect;

before(Suite.setupServer);

describe('GET /topics', {only: true}, function () {

	it('should reply (200) with subscription topics', (done) => {
			Suite.server.inject({ method: 'GET', url: '/topics' }, (res) => {
				expect(res.statusCode).to.equal(200);
				expect(res.payload).to.exist();
				expect(res.result).to.exist();
				expect(res.result).to.equal(pluginOpts.topics);
				done();
			});
		})
})

describe('GET /user/{userId}/topics', function () {

	it('should reply (200) with subscription topics', (done) => {
		throw Error('Not implemented yet');
	})

	it('should reply with 404 for invalid user', (done) => {
		throw Error('Not implemented yet');
	})

	it('should reply with 401 for missing token', (done) => {
		throw Error('Not implemented yet');
	})

	it('should reply with 401 for invalid token', (done) => {
		throw Error('Not implemented yet');
	})

})

describe('PUT /user/{userId}/topics', function () {

	it('should reply (200) with subscription topics', (done) => {
		throw Error('Not implemented yet');
	})

	it('should reply with 404 for invalid user', (done) => {
		throw Error('Not implemented yet');
	})

	it('should reply with 401 for missing token', (done) => {
		throw Error('Not implemented yet');
	})

	it('should reply with 401 for invalid token', (done) => {
		throw Error('Not implemented yet');
	})

})