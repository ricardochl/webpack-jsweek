const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');
const MiniCssExtracPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.js'),
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    output: {
        filename: 'bundle.[contentHash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options:{
                            esModule: false,
                            name: 'assets/img/[name].[ext]'
                        }
                    },
                ],
                
            },
            {
                test: /\.css$/,
                exclude:  /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    {
                        loader: MiniCssExtracPlugin.loader,
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    }
                ]
            },
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: 'src/assets/img', to: 'assets/img/'}
        ]),
        new CleanWebpackPlugin(),
        new HtmlWepackPlugin({
            template:'./index.html',
            filename: './index.html'
        }),
        new MiniCssExtracPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),
        new MinifyPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode:  'static',
            openAnalyzer:  true
        })
    ]
}