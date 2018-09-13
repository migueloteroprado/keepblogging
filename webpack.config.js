/* eslint-disable */

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, 'src', 'index'),
	output: {
		filename: 'bundle[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		open: false,
		overlay: true,
		port: 3000
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Keep Blogging',
			template: path.join(__dirname, 'src', 'pages', 'index', 'index.html'),
			minify: {
				collapseWhitespace: true
			}
		}),
		new CleanWebpackPlugin(['dist'])
	]
};
