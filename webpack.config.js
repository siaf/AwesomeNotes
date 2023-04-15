const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src', 'index.js')
    },
    output: {

        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[contenthash].js',
        assetModuleFilename: 'assets/[name][ext]',
        clean: true
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                parser: {
                  amd: false
                },
                include: /node_modules\/lodash\// // https://github.com/lodash/lodash/issues/3052
            },
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
                test: /\.(png|gif|svg|jpe?g)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'gpt-playground.html',
            template: path.resolve(__dirname, 'src', 'gpt-playground.html')
        }),
        //new BundleAnalyzerPlugin()
    ]
};