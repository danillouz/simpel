'use strict';

function throwError(message) {
	throw new Error(message);
}

/**
 * Renders a Simple Element into the DOM in the supplied
 * container.
 *
 * @param  {Object} element   - the Simple element to be appended
 * @param  {Object} container - the targeted HTML element
 */
function render(
	element = throwError('Provide an Element. For example `<div>Hello World!</div>`'),
	container = throwError('Provide a container to append an Element to.')
) {
	container.appendChild(element);
}

module.exports = render;
