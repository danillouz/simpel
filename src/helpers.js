'use strict';

/**
 * Throws an Error message.
 *
 * @private
 *
 * @param  {String} message - custom Error message
 *
 * @throws {Object} Error
 */
function throwError(message) {
	throw new Error(message);
}

/**
 * Determines if a child Component is a HTML Text Node.
 *
 * @private
 *
 * @param  {Mixed}  child - the child component
 *
 * @return {Boolean} Denotes if the child is a Text Node
 */
function isText(child) {
	const isString = typeof child === 'string';
	const isNumber = typeof child === 'number';

	return isString || isNumber;
}

module.exports = {
	throwError, isText
};
