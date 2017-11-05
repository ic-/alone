const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('../webpack.config.dev.js')
const compiler = webpack(config);
let Server = new WebpackDevServer(compiler, {
    //gzip
    compress: true,
    // lazy: true,
    // filename:'chunk.[hash].js',
    // 不跳转
    historyApiFallback: false,
    stats: { colors: true, reasons: true },
    inline: true,   // iframe/
    hot: true,  // 热替换
    progress: true,
    hotOnly: true, //局部替换
    noInfo: false,   // 打包信息ß
});

Server.listen(8081, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Webpack-dev-server started successfully!');
    console.log('----------------------------------------');
    console.log('Listening at localhost:8081\n');
});

module.exports = Server;
