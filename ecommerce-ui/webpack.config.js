const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
        chunkFilename: '[name].bundle.[fullhash].js',
        clean: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            minify:{
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css'
        }),
        new OptimizeCssAssetsPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader' }],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader", 
                    "css-loader" 
                ],
            },
            {
                test: /\.html$/,
                use: [
                    {loader: "html-loader"} 
                ],
            },
            {
                test: /\.(svg|jpg|png)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'images'
                    }

                }
            },
        ],
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        open: true,
    }
};