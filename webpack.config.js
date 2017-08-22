const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const PATHS = {
	app: path.join(__dirname, 'client'),
	build: path.join(__dirname, 'public'),
};

module.exports = {
	devtool: 'eval-source-map',
	entry: {
		app: PATHS.app,
		vendor: ['react'],
	},
	output: {
		path: PATHS.build,
		filename: '[name].js',
		publicPath: '/public/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				loader: 'eslint-loader',
				options: {
					emitWarning: true,
					fix: true,
				},
			},
			{
				test: /\.css$/,
				exclude: '/node_modules/',
				enforce: 'pre',
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								modules: true,
							},
						},
					],
					fallback: 'style-loader',
				}),
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Webpack demo',
		}),
		new ExtractTextPlugin('styles.css'),
		new BabiliPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
		}),
	],
	devServer: {
		host: process.env.host,
		port: process.env.port,
		hot: true
	},
	// performance:{  //检测文件大小
	//     hints: 'warning',
	//     maxEntrypointSize: 100000,
	//     maxAssetSize: 450000
	// },
};