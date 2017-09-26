const webpack = require('webpack');
const path = require('path')
const merge = require('webpack-merge')
const config = require('../config/build.config')
const baseWebpackConfig = require('./webpack.config.base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify('development')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.DllReferencePlugin({
			context: path.join(__dirname, "..", "dll"),
			manifest: require("../dll/manifest.json") // eslint-disable-line
		}),
    ]
})
