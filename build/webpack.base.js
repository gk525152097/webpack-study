// 导入path模块
const path = require('path') // node核心模块 path

// 引入vue-loader-plugin插件 将其他打包规则应用到.vue用 以实现文件正常打包
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 引入html-webpack-plugin 用于在出口文件中生成html入口文件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 引入clean-webpack-plugin 用于每次build的时候将dist文件夹清空
// 新版本clean-webpack-plugin需要使用 es6解构的方式引入
// 执行时间 在webpack打包之前 先删除dist 在通过webpack打包生成dist 再通过htmlweobpack生成index.html
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // 打包入口文件
    entry: './src/main.js',
    // 出口文件
    output: {
        filename: 'main.js', // 生成名称
        path: path.resolve(__dirname, '../dist') // 路径 webpack文件在build里 故 需要../到根目录里
        // Node.js 中，__dirname 总是指向被执行 js 文件的绝对路径，所以当你在 /d1/d2/myscript.js 文件中写了 __dirname， 它的值就是 /d1/d2 
    },
    // 配置打包规则
    module: {
        rules: [
            {   test: /\.js$/,
                exclude: /node_modules/, 
                loader: "babel-loader"
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                loader: 'url-loader', // 依赖file-loader
                options: {
                    name: '[name].[ext]',
                    limit: 2048 // 当文件小于2048byte时 使用url-loader 大于时使用file-loader
                }
            },
            {
                test: /\.css&/,
                use: ['style-loader', 'css-loader'] // css-loader将所有css文件打包成一个文件 style-loader将css-loader打包的文件挂载到页面head标签里
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader', // 用于给新css样式添加厂商前缀
                    'stylus-loader'
                ]
            }
        ]
    },
    // 插件
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html' // 以index.html为模版
        }),
        new CleanWebpackPlugin()
    ],
    // 解决
    resolve: {
        // 别名
        alias: {
            'vue': 'vue/dist/vue.js' // 在导入文件时 遇到 'vue' 会去导入 'vue/dist/vue.js' 而不是'vue'
        }
    }
}