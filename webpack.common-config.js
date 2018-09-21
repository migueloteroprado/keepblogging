var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Dotenv = require('dotenv-webpack');
var webpack = require('webpack');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

var page = function({ title, template, chunks, filename }) {
  return new HtmlWebpackPlugin(
    {
      title: title,
      template: template,
      chunks: chunks,
      minify: {
        collapseWhitespace: true
      },
      filename: filename
    }
  )
}

module.exports = {
	entry: {
		articles: ['@babel/polyfill', 'whatwg-fetch', path.join(__dirname, 'src', 'pages', 'articles', 'index')],
		article: ['@babel/polyfill', 'whatwg-fetch', path.join(__dirname, 'src', 'pages', 'article', 'index')],
		categories: ['@babel/polyfill', 'whatwg-fetch', path.join(__dirname, 'src', 'pages', 'categories', 'index')]
	},
	output: {
		filename: '[name][hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
    new Dotenv(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, 'src', 'assets', 'favicon.png'),
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    page({
      title: 'Keep Blogging',
      template: path.join(__dirname, 'src', 'pages', 'articles', 'index.html'),
      chunks: ['articles'],
      filename: path.resolve(__dirname, 'dist', 'index.html')
		}),
    page({
      title: 'Article',
      template: path.join(__dirname, 'src', 'pages', 'article', 'index.html'),
      chunks: ['article'],
      filename: path.resolve(__dirname, 'dist', 'article', 'index.html')
		}),	
    page({
      title: 'Categories',
      template: path.join(__dirname, 'src', 'pages', 'categories', 'index.html'),
      chunks: ['categories'],
      filename: path.resolve(__dirname, 'dist', 'categories', 'index.html')
		}),			
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
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader'
          }
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