'use strict';

const path = require('path');

module.exports = {
	entry: [
		'./src/index.js'
	],

	output: {
		path: path.join(__dirname, 'lib'),
		filename: 'simpel.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				include: /\.js$/,
				exclude: /\.spec.js$/,
				loaders: [ 'babel' ]
			}
		]
	},

	resolve: {
		extensions: [ '', '.js', '.jsx', '.styl' ],
		fallback: path.join(__dirname, 'node_modules')
	},

	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	}
};
