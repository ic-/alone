
const webpack = require('webpack');
const path = require('path');

const config = {
    devtool: "cheap-eval-source-map",
    entry:{
        app:'./client/index.js'
    }, 
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/assets/'
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: '/node_modules/',
                use:[
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitError: true,
                            fix: true,
                        }
                    }
                ]
            }
        ]
    }
}


module.exports = config;



