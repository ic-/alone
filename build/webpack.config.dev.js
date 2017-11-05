const webpack = require('webpack');
const path = require('path')
const merge = require('webpack-merge')
const config = require('../config/build.config')
const baseWebpackConfig = require('./webpack.config.base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: [

    ]
  },
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
      context: __dirname,
      manifest: require("../public/dll/manifest.json")
    }),
  ]
})
