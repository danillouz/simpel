'use strict';

const webpack = require('webpack');
const config = require('./webpack.config');

module.exports = Object.assign(
	{ },
	config,
	{
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: 'production'
				}
			}),

			new webpack.optimize.DedupePlugin(),

			new webpack.optimize.AggressiveMergingPlugin(),

			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				},
				comment: false
			})
		]
	}
);
