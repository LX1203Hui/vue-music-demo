//"val:"+ String.fromCodePoint(i+65)+",name:"+String.fromCodePoint(i+97)
// function fun(){
//     for (let i = 0; i < 26; i++) {
//         let str = "{val:"+(i+97)+",name:'"+String.fromCodePoint(i+65)+"'},"
//         console.log(str)
//     }
    
// }
// fun()
// let arr=[1,2,3,4]
// let fill =new Array(10).fill({id:-1},0,10)
// let newarr = fill.splice(0,arr.length,...arr)
// console.log(fill)
function hasChinese(){
    let reg = new RegExp(/[\u4e00-\u9fa5]/g);
}
hasChinese()