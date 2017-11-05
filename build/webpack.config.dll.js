const path = require("path");
const webpack = require('webpack');
module.exports = {
  resolve: {
    extensions: [".js", ".jsx"]
  },
  entry: {
    venders: ['babel-polyfill', 'classnames', 'history/lib/createBrowserHistory', 'immutable',
    'isomorphic-fetch', 'prop-types', 'react', 'react-dom','eruda',
    'react-redux', 'react-router', 'react-transition-group',
    'redux', 'redux-immutable', 'redux-thunk', 'redux-devtools',
    'redux-devtools-dock-monitor', 'redux-devtools-log-monitor', 'redux-logger']
  },
  output: {
    path: path.join(__dirname, '../public', 'dll'),  //内存输出地址文件
    filename: '[name]_[hash].js',
    libraryTarget: 'umd',
    library: 'vendersLibrary',  // 配合下面的name 暴露出dll函数
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,     // manifest 文件中请求的上下文环境 与DllReferencePlugin的context参数保持一致
      name: 'vendersLibrary',  // DLL 的函数名
      path: path.join(__dirname, '../public', 'dll', 'manifest.json'),  //manifest json 文件的绝对路径 (输出文件)
    })
  ],
};


