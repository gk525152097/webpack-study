const baseConfig = require('./webpack.base.js')
const merge = require('webpack-merge')
// 引入webpack hot 热部署插件
const webpack = require('webpack');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, './dist'), // 设置url的根目录，如果不设置，则默认是指向项目根目录
        historyApiFallback: true, // 让所有404的页面定位到index.html
        open: false,
        hot: true
    },
    // 插件
    plugins: [
        // new webpack.NamedModulesPlugin(), // 用于启动HMR时可以显示模块的相对路径
        new webpack.HotModuleReplacementPlugin() // 局部更新
    ]
})