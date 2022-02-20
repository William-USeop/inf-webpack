const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');

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
           
       })
    ]
}
