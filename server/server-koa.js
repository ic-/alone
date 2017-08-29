import Koa from 'koa';
import views from 'koa-views';
import path from 'path';

import webpack from 'webpack'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import devConfig from '../webpack.config'
const compile = webpack(devConfig)

const PORT = process.env.PORT || 3000
const app = new Koa();
debugger
if (process.env.NODE_ENV == 'development') {
    debugger
    app.use(devMiddleware(compile, {
        // display no info to console (only warnings and errors)
        noInfo: false,
        // display nothing to the console
        quiet: false,
        // switch into lazy mode
        // that means no watching, but recompilation on every request
        lazy: true,
        // watch options (only lazy: false)
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        },
        // public path to bind the middleware to
        // use the same as in webpack
        publicPath: "/assets/",
        // custom headers
        headers: { "X-Custom-Header": "yes" },
        // options for formating the statistics
        stats: {
            colors: true
        }
    }))
    app.use(hotMiddleware(compile, {
        // log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }))
}

// app.use(require('koa-static')(path.join(__dirname, '../build')));
// app.use(views(path.join(__dirname, '../views'), {
//     extension: 'html'
// }));
// app.use(async (ctx, next) => {
//     const start = new Date();
//     await next();
//     const ms = new Date() - start;
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });
// response
// app.use(async (ctx) => {
//     await ctx.render('index.html');
// });
app.listen(PORT, 'localhost', (err) => {
    console.log(`系统启动：http://localhost:${PORT}`);
});
module.exports = app;
