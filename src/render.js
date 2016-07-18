'use strict';

const helpers = require('./helpers');

const _throwError = helpers.throwError;

/**
 * Renders an HTML Element into the DOM in the supplied
 * container.
 *
 * @param  {Object} element   - the Simple element to be appended to the DOM
 * @param  {Object} container - the HTML container into which the HTML Element will be rendered.
 */
function render(
	element = _throwError(
		'Provide an Element. For example `<div>Hello World!</div>`'
	),
	container = _throwError(
		'Provide a container to append an Element to.'
	)
) {
	container.appendChild(element);
}

module.exports = render;
