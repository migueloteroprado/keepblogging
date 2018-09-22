module.exports = {
	module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
	devServer: {
		open: false,
		overlay: true,
		port: 3000
  },
  devtool: 'source-map'
}