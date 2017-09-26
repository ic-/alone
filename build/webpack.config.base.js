import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
const baseConfig = {
    context: path.resolve(__dirname, "../"),
    // 配置需要打包的入口文件，值可以是字符串、数组、对象。
    // 1. 字符串： entry： './entry'
    // 2. 字符串： entry：[ './entry1','entry2'] (多入口)
    // 3. 对象：   entry： {alert/index': path.resolve(pagesDir, `./alert/index/page`)}
    // 多入口书写的形式应为object，因为object,的key在webpack里相当于此入口的name,
    entry: {
        app: './client/index.js'
    },
    output: {
        //输出路径
        path: path.resolve(__dirname, '../dist/'),
        //文件名[entryName] [hash:len] [chunkhash:len]
        filename: '[name].js',
        //资源访问路径，CDN
        // publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        publicPath: './',
    },

    // 用来配置依赖文件的匹配，如依赖文件的别名配置、模块的查找目录、默认查找的
    // 文件后缀名
    // resolve.root 该选型用来制定模块查找的根路径，必须为**绝对路径**，值可以
    // 是路径字符串或者路径数组若是数组，则会依次查找
    resolve: {
        //绝对路径
        // root:
        //自动扩展 不需要写后缀
        extensions: ['.js', '.jsx', '.json', '.css', '.less'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            // 'src': path.resolve(__dirname, '../client'),
            // 'assets': path.resolve(__dirname, '../client/assets'),
            // 'components': path.resolve(__dirname, '../client/components')
        }
    },

    // 用来进行模块加载相关的配置
    module: {
        rules: [
            // webpack拥有一个类似于插件的机制，名为Loader，通过Loader，webpack能够针对每一种特定的资源做出相应的处理
            // 1.test参数用来指示当前配置项针对哪些资源，该值应是一个条件值(condition)。
            // 2.exclude参数用来剔除掉需要忽略的资源，该值应是一个条件值(condition)。
            // 3.include参数用来表示本loader配置仅针对哪些目录/文件，该值应是一个条件值(condition)。
            // 而include参数则用来指示目录；注意同时使用这两者的时候，实际上是and的关系。
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitError: true,
                            fix: true
                        },
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
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
            {
                test: /\.json$/,
                exclude: '/node_modules/',
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: '/node_modules/',
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit:  10000,
                            name: 'img/[name].[hash:6].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                exclude: '/node_modules/',
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit:  10000,
                            name: 'fonts/[name].[hash:6].[ext]'
                        }
                    }
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack demo',
            filename: 'index.html',
            template: './views/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: 3,
        }),
    ]

}


module.exports  = baseConfig
