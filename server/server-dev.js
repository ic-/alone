import { webpack } from 'webpack';
import { WebpackDevServer } from 'webpack-dev-server';
import config from '../webpack.config.js';

const compiler = webpack(config);
console.log(compiler)
let Server = new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    inline: true,
    hot: true,
    historyApiFallback: true,
    color: true
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
