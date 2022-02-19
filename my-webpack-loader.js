module.exports=function myWebpackLoader(content){
    
    //console.log('myWebpackLoader 실행');
    //문서내 console.log(가 있다면 alert( 으로 치환
    return content.replace('console.log(','alert(');
}