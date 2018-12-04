const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');


module.exports = {

    mode: 'development',
    entry: './src/index.js',
    //devtool: 'inline-source-map',
    devtool: 'cheap-module-eval-source-map', // this helps to browser to point to the exact file in the console, helps in debug
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        port: 9000
    },
    performance: {
        hints: false
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/public/index.html')
        }),
        //new CleanWebpackPlugin(['public/js']),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            }, {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
};