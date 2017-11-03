const path = require("path");
const webpack = require('webpack');
const vendors = ['babel-polyfill', 'classnames', 'history/lib/createBrowserHistory', 'immutable',
  'isomorphic-fetch', 'prop-types', 'react', 'react-dom',
  'react-redux', 'react-router', 'react-transition-group',
  'redux', 'redux-immutable', 'redux-thunk', 'redux-devtools',
  'redux-devtools-dock-monitor', 'redux-devtools-log-monitor', 'redux-logger']

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"]
  },
  entry: {
    dll: vendors
  },
  output: {
    path: path.resolve(__dirname, '..', 'dll'),  //内存输出地址文件
    filename: '[name]_[hash].js',
    library: '[name]_[hash]',  // 配合下面的name 暴露出dll函数
  },
  plugins: [
    new webpack.DllPlugin({
      context: path.join(__dirname, ".."),     // manifest 文件中请求的上下文环境 与DllReferencePlugin的context参数保持一致
      path: path.join(__dirname, '..', 'dll', "manifest.json"),  //manifest json 文件的绝对路径 (输出文件)
      name: "[name]_[hash]",  // DLL 的函数名
    })
  ],
};


