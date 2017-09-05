const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('../webpack.config.dev.js')
const compiler = webpack(config);
let Server = new WebpackDevServer(compiler, {
    stats: { colors: true },
    inline: true,
    hot: true,
});

Server.listen(8081, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Webpack-dev-server started successfully!');
    console.log('----------------------------------------');
    console.log('Listening at localhost: 8081\n');
});

module.exports = Server;
