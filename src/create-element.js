'use strict';

const eventsMap = require('./events-map');

function throwError(message) {
	throw new Error(message);
}

function _isText(text) {
	const isString = typeof text === 'string';
	const isNumber = typeof text === 'number';

	return isString || isNumber;
}

function createElement(
	type = throwError('A `type` arguments is required to create an element. For example \'div\'.'),
	attributes,
	...children
) {
	const isFunction = type instanceof Function;
	const isElement = type instanceof window.Node;

	if (isFunction) {
		const el = type(attributes);

		return createElement(el);
	}

	if (isElement) {
		return type;
	}

	const element = document.createElement(type);
	const attr = attributes || { };

	Object
		.keys(attr)
		.forEach(name => {
			const value = attr[name];
			const eventName = eventsMap[name];

			if (eventName) {
				element.addEventListener(eventName, value);
			} else {
				element.setAttribute(name, value);
			}
		});

	children
		.reduce(
			(previous, current) => previous.concat(current),
			[ ]
		)
		.forEach(child => {
			const isText = _isText(child);

			if (isText) {
				const textNode = document.createTextNode(child);

				element.appendChild(textNode);
			} else {
				element.appendChild(child);
			}
		});

	return element;
}

module.exports = createElement;
