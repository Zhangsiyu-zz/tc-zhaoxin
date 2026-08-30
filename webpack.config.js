const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = ['index', 'login', 'register', 'apply', 'result'];

module.exports = {
    mode: 'development',
    entry: {
        index: './src/js/entries/index.js',
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
    },
    plugins: pages.map((name) => new HtmlWebpackPlugin({
        template: `./src/pages/html/${name}.html`,
        filename: `${name}.html`,
        chunks: [],
        inject: false,
    })),
    module: {
        rules: [
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
    },
};
