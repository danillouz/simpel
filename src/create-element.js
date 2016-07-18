'use strict';

const eventsMap = require('./events-map');
const helpers = require('./helpers');

const REFS_MAP = Object.create(null);

const _throwError = helpers.throwError;
const _isText = helpers.isText;

/**
 * Creates an HTML Element.
 *
 * @param  {String|Function|Element} type  	  - the Element to be created
 * @param  {Object} 				 props 	  - contains the properties of a `SimpEl` Component as key value pairs
 * @param  {Array|Element|String}    children - the child Elements of a `SimpEl` Component
 *
 * @return {Object} HTML Element
 */
function createElement(
	type = _throwError(
		'A `type` arguments is required to create an Element. For example \'div\'.'
	),
	props,
	...children
) {
	const isFunction = type instanceof Function;
	const isElement = type instanceof window.Node;

	if (isFunction) {
		const el = type(props);

		return el;
	}

	if (isElement) {
		return type;
	}

	const element = document.createElement(type);
	const attr = props || { };
	const attrKeys = Object.keys(attr);

	attrKeys.forEach(name => {
		const isRef = name === 'ref';
		const refName = attr[name];

		if (isRef) {
			REFS_MAP[refName] = element;
		}
	});

	const context = Object.assign(
		{ },
		{ refs: REFS_MAP }
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
