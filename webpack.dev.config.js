const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 入口
    entry: [
        'react-hot-loader/patch',
        path.join(__dirname,'src/index.js'),
    ],
    //输出到dist文件夹，输出文件名字是bundle.js
    output: {
        path: path.join(__dirname,'./dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname,'src/component'),
            router: path.join(__dirname,'src/router')
        }
    },
    // src文件夹下面的.js结尾的文件，要使用babel解析
    // cacheDirectory是用来缓存编译结果，下次编译加速
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname,'src')
            },
            {
                test:/\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]
    },
    devServer: {
        // URL根目录，如果不设定的话，默认指向项目根目录
        contentBase: path.join(__dirname,'./dist'),
        // 监听端口
        port:8888,
        // 任意的404响应都会被替代为index.html
        historyApiFallback:true,
        host:'127.0.0.1',
        // 启用webpack的模块热替换特性
        hot:true,
        // proxy代理
        proxy: {}
    },
    devtool: 'inline-source-map',
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'src/index.html')
    })]
}