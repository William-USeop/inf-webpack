// ES6를 작성할 때 필요한 플러그인을 그때그때마다 추가하고 플러그인을 쓰지 않아도 되는 플러그인을 뭉탱이로 끌고 다니는 것은 비효율적이다
// 이를 효율적으로 운영하기 위해 '프리셋' 설정을 한다.

module.exports=function myBebelPreset(params) {
    return {
        plugins : [
            "@babel/plugin-transform-block-scoping",
            "@babel/plugin-transform-arrow-functions",
            "@babel/plugin-transform-strict-mode",
        ]
    }
}