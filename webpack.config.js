const path = require('path');

module.exports={
    mode : 'development',
    entry : {
        main : './src/app.js',
        shoplive : './src/shoplive.js'        
    },
    output:{
        path: path.resolve('./dist'),
        filename:'[name].js'
    }
}
