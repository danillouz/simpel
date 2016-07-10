'use strict';

const chai = require('chai');
const createElement = require('./create-element');

const assert = chai.assert;

describe('createElement(type, attributes, children)', function () {
	it('throws an Error with missing `type` argument', function () {
		assert.throws(
			createElement,
			'A `type` arguments is required to create an element. For example \'div\'.'
		);
	});

	it('can create an HTML element', function () {
		const tag = 'div';
		const element = createElement(tag);

		assert.instanceOf(element, window.Node);
		assert.equal(element.nodeType, 1);
		assert.equal(tag.toUpperCase(), element.nodeName);
	});

	it('can append children to an HTML element', function () {

		/**
		 * Mock HTML has the following structure:
		 *
		 * node nr. 3 | <div>
		 * node nr. 2 |    <p>
		 * node nr. 1 |        Hello World!
		 * node nr. 2 |    </p>
		 * node nr. 3 | </div>
		 *
		 * Note that tests are written _inside out_.
		 */

		// Create node number 3.
		const text = 'Hello World!';

		// Create node number 2.
		const childTag = 'p';
		const childElement = createElement(childTag, null, text);
		const textNode = childElement.firstChild;

		// Create node number 1.
		const parentTag = 'div';
		const parentElement = createElement(parentTag, null, childElement);

		// Test node number 1.
		assert.instanceOf(textNode, window.Node);
		assert.equal(textNode.nodeType, 3);
		assert.equal(textNode.nodeName, '#text');

		// Test node number 2.
		assert.instanceOf(childElement, window.Node);
		assert.equal(childElement.nodeType, 1);
		assert.equal(
			childElement.nodeName,
			childTag.toUpperCase()
		);

		// Test node number 3.
		assert.instanceOf(parentElement, window.Node);
		assert.equal(parentElement.nodeType, 1);
		assert.equal(
			parentElement.nodeName,
			parentTag.toUpperCase()
		);

		assert.deepEqual(
			parentElement.firstChild,
			childElement
		);
	});

	it('sets attributes when creating elements', function () {
		const props = {
			class: 'container'
		};

		const element = createElement('div', props);

		Object
			.keys(props)
			.forEach(prop => {
				assert.equal(
					element.getAttribute(prop),
					props[prop]
				);
			});
	});
});
