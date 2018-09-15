var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin;
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(
        {
          cssProcessorOptions: { map: { inline: false } }
        }
      ),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
    new CleanWebpackPlugin(['dist']),
    new CriticalPlugin({
      src: path.join(__dirname, 'src', 'pages', 'articles', 'index.html'),
      inline: true,
      minify: true,
      dest: path.join(__dirname, 'dist', 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}