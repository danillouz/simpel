'use strict';

const eventsMap = require('./events-map');

const refsMap = Object.create(null);

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

		return el;
	}

	if (isElement) {
		return type;
	}

	const element = document.createElement(type);
	const attr = attributes || { };
	const attrKeys = Object.keys(attr);

	attrKeys.forEach(name => {
		const isRef = name === 'ref';
		const refName = attr[name];

		if (isRef) {
			refsMap[refName] = element;
		}
	});

	const context = Object.assign(
		{ },
		{ refs: refsMap }
	);

	attrKeys.forEach(name => {
		const value = attr[name];
		const eventName = eventsMap[name];

		if (eventName) {
			element.addEventListener(
				eventName,
				value.bind(context)
			);
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
