const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'client'),
    build: path.join(__dirname, 'dist'),
};

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        app: PATHS.app,
        vendor: ['react', 'babel-polyfill'],
    },
    output: {
        path: PATHS.build,
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
        new HtmlWebpackPlugin({
            title: 'Webpack demo'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('styles.css'),
        new BabiliPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
    ],
    devServer: {
        host: process.env.host,
        port: process.env.port,
        // contentBase: path.join(__dirname, "dist"),
        // compress: true,
        hot: true,  //热替换
        // inline: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', 'css', 'less']
    }
    // performance:{  //检测文件大小
    //     hints: 'warning',
    //     maxEntrypointSize: 100000,
    //     maxAssetSize: 450000
    // },
};
