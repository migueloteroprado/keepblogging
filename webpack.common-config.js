var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Dotenv = require('dotenv-webpack');

module.exports = {
	entry: ['babel-polyfill', path.join(__dirname, 'src', 'index')],
	output: {
		filename: 'bundle[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new Dotenv(),
		new HtmlWebpackPlugin({
			title: 'Keep Blogging',
			template: path.join(__dirname, 'src', 'pages', 'index', 'index.html'),
			minify: {
				collapseWhitespace: true
			}
		})
	],
	module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              name: "assets/[name].[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(html|ejs)$/,
        use: ['html-loader', 'ejs-html-loader']
      }
    ]
	},
	resolve: {
	  alias: {
			components: path.resolve(__dirname, 'src', 'components'),
			assets: path.resolve(__dirname, 'src', 'assets'),
			styles: path.resolve(__dirname, 'src', 'styles'),
			utils: path.resolve(__dirname, 'src', 'utils'),
			data: path.resolve(__dirname, 'src', 'data'),
			services: path.resolve(__dirname, 'src', 'services'),
			pages: path.resolve(__dirname, 'src', 'pages')
	  }
	},
	devtool: 'source-map'
};