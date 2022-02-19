import './app.css'
import {sum} from './math.js'
import { helloShoplive } from './shoplive.js';
import nyancat from './nyancat.jpeg';


console.log(sum(1,2));
document.addEventListener('DOMContentLoaded',()=>{
    document.body.innerHTML=`<img src="${nyancat}" />`
})

// TODO: shoplive.js 파일 번들링 테스트
helloShoplive();