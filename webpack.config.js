const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = ['index', 'login', 'register', 'apply', 'result'];

module.exports = {
    mode: 'development',
    entry: {
        index: './src/js/entries/index.js',
        register: './src/js/entries/register.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
        clean: true,
    },
    devServer: {
        static: [
            {
                directory: path.join(__dirname, 'src/pages/html'),
            },
            {
                directory: path.join(__dirname, 'src/pages/css'),
                publicPath: '/css',
            },
        ],
        port: 3001,
        open: true,
        hot: true,
        // 跨域代理，解决后端接口访问问题
        proxy: [
            {
                context: ['/api'], // 只要请求以 /api 开头
                target: 'http://123.56.71.168:8081', // 就转发给后端的地址
                changeOrigin: true,
            }
        ],
    },
    plugins: [
        // 首页
        new HtmlWebpackPlugin({
            template: './src/pages/html/index.html',
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
        }),
        // 注册页
        new HtmlWebpackPlugin({
            template: './src/pages/html/register.html',
            filename: 'register.html',
            chunks: ['register'],
            inject: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                },
            },
        ],
    }
};