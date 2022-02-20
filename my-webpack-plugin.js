class MyWebpackPlugin{
    apply(compiler) {
        // compiler.hooks.done.tap("My Plugin", stats => {
        //   console.log("MyPlugin: done")
        // })
    
        // compiler.plugin() 함수로 후처리한다
        compiler.plugin("emit", (compilation, callback) => {

            // 아웃풋에 있는 main.js 소스 함수를 통해 취득
          const source = compilation.assets["main.js"].source()
        //   console.log(source)
        compilation.assets['main.js'].source=()=>{
            const banner = [
                '/**',
                 '* BannerPlugin이 처리한 결과',
                 '* Build Date : 2022-02-20',
                 '*/',
            ].join('\n');
            // 소스 내용 상단에 위에 banner 내용이 추가
            return banner+'\n\n'+source;
        }
          callback()
        })
      }
    }
module.exports = MyWebpackPlugin;