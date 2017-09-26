const path = require("path");
const webpack = require('webpack');
const vendors = [
    'react',
    'react-dom'
];

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


