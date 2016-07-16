'use strict';

const chai = require('chai');
const render = require('./render');

const assert = chai.assert;

describe('render(element, target)', function () {
	it('throws an Error with missing `element` argument', function () {
		assert.throws(
			render,
			'Provide an Element. For example `<div>Hello World!</div>`'
		);
	});

	it('throws an Error with missing `target` argument', function () {
		assert.throws(
			render.bind(undefined, true),
			'Provide a container to append an Element to.'
		);
	});
});
