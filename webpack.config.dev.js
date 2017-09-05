const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        "app": [
            // 'webpack/hot/dev-server',
            // 'webpack-dev-server/client?http://localhost:8081/',
            './client/index.js'
        ],
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitError: true,
                            fix: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: '/node_modules/',
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
        // OccurenceOrderPlugin is needed for webpack 1.x only
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),  //hot
        // new ExtractTextPlugin('styles.css'),  //提取style
        new BabiliPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({   //提取公用函数
        //     name: 'vendor',
        // }),
        new HtmlWebpackPlugin({
            title: 'Webpack demo',
            filename: 'index.html',
            template: './views/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', 'css', 'less']
    }
    // performance:{  //检测文件大小
    //     hints: 'warning',
    //     maxEntrypointSize: 100000,
    //     maxAssetSize: 450000
    // },
};
