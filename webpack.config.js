const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports={
    mode : 'development',
    entry : {
        //main : './src/app.js',
        main : './app.js',
        //shoplive : './src/shoplive.js'        
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
                    process.env.NODE_ENV === "production"
                    ? MiniCssExtractPlugin.loader // 프로덕션 환경
                    : "style-loader", // 개발 환경
                  "css-loader",
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                  //publicPath: './dist/',
                  name: '[name].[ext]?[hash]',
                  //2kb이상일 경우 file-loader
                  limit:20000, 
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader", // 바벨 로더를 추가한다
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
           template: './src/index.html',
           templateParameters: { // 템플릿에 주입할 파라매터 변수 지정
            env: process.env.NODE_ENV === 'development' ? '(개발용)' : '일반',          
          },
          // 환경이 env 운영일때만 적용
          minify : process.env.NODE_ENV==='production'?{
            // 빈칸 제거
            collapseWhitespace : true,
            // 주석을 제거
            removeComments : true, 
        } : false
       }),
       new CleanWebpackPlugin(),
       ...(process.env.NODE_ENV === "production"
       ? [new MiniCssExtractPlugin({ filename: `[name].css` })]
       : []),
    ]
}
