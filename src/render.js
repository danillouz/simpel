'use strict';

function throwError(message) {
	throw new Error(message);
}

/**
 * Renders an HTML by appending it to a specific
 * HTML target.
 *
 * @param  {Object} element - the HTML element to be appended
 * @param  {Object} target  - the targeted HTML element
 */
function render(
	element = throwError('Provide an element. For example `<div>Hello World!</div>`'),
	target = throwError('Provide a target to append HTML to.')
) {
	target.appendChild(element);
}

module.exports = render;
