const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports={
    mode : 'development',
    entry : {
        main : './src/app.js',
        shoplive : './src/shoplive.js'        
    },
    output:{
        path: path.resolve('./dist'),
        filename:'[name].js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                  publicPath: './dist/',
                  name: '[name].[ext]?[hash]',
                  limit:20000, //2kb
                }
            }
        ]
    },
    plugins:[
       new webpack.BannerPlugin({
           banner:`
           Build Date : ${new Date}
           Commit Version : ${childProcess.execSync('git rev-parse --short HEAD')}
           Author : ${childProcess.execSync('git config user.name')}
           `
           
       }),
       new webpack.DefinePlugin({
           //전역변수 TWO로 접근하여 어디서든 콘솔로 확인 가능하다.
           TWO: JSON.stringify('1+1'),
           'api.domain':JSON.stringify('http://dev.api.domain.com')
           
       }),
       new HtmlWebpackPlugin({
           template: './src/index.html'
       })
    ]
}
