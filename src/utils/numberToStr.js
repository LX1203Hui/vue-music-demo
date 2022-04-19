export function numtostr(num){
    let len = num.toString().length
    if(typeof num == 'number'){
        if (len>=5 && len <9){
            return Math.floor(num/10000) +"万"
        }else if(len >= 9){
            return Math.floor(num/100000000) +"亿"
        }else{
            return num
        }
    }
    
}

