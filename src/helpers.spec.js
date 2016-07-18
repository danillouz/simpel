'use strict';

const chai = require('chai');
const helpers = require('./helpers');

const assert = chai.assert;

describe('helpers.throwError(message)', function () {
	it('throws an Error with a custom message', function () {
		const message = 'Custom error message.';

		assert.throws(
			helpers.throwError.bind(undefined, message),
			message
		);
	});
});

describe('helpers.isText(child)', function () {
	it('returns `true` when `child` is a String', function () {
		const result = helpers.isText('string');

		assert.isTrue(result);
	});

	it('returns `true` when `child` is a Number', function () {
		const result = helpers.isText(1);

		assert.isTrue(result);
	});

	it('returns `false` when `child` is not a String or Number', function () {
		const result = helpers.isText([ ]);

		assert.isFalse(result);
	});
});
