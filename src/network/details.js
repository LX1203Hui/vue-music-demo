import { request } from "./request";

let api = {
    songs : '/playlist/track/all',
    songer: '/artist/list'
}

/**
 * 获取歌单全部音乐（参数决定数量）
 * @returns 
 */
export function _getSongList(id,limit){
    if(arguments.length==1){
        return request({
            url:`${api.songs}?id=${id}`
        })
    }else{
        return request({
            url:`${api.songs}?id=${id}&limit=${limit}`
        })
    }
    
}

/**
 * 获取歌手（参数决定数量）
 * @returns 
 */
export function _getSongerList(param,page){
    let offset= ( page -1 )*30
    if(arguments.length==1){
        return request({
            url:`${api.songer}?${param}`
        })
    }else{
        return request({
            url:`${api.songer}?${param}&offset=${offset}`
        })
    }
    
}
