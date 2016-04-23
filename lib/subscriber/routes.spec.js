'use strict';
const Code = require('code');
const Hoek = require('hoek');
const Lab = require('lab');

// Internals
const Suite = require('./test/suite');
const Sinon = require('sinon');

// Helpers
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const before = lab.before;
const beforeEach = lab.beforeEach;
const afterEach = lab.afterEach;
const after = lab.after;
const it = lab.it;
const expect = Code.expect;

describe('GET /topics', function () {

	it('should reply (200) with subscription topics', (done) => {
		throw Error('Not implemented yet');
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