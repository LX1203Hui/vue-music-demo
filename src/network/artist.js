
//取消/收藏歌手(1/other)
// /artist/sub?id=6452&t=1

//50首
// /artist/top/song?id=6452

//收藏歌手列表
// {"code":301,"message":"未登录","msg":"需要登录"}
// /artist/sublist

//描述
// /artist/desc?id=6452

//mv
// /artist/mv?id=6452

//类似歌手
// /simi/artist?id=6452

//专辑内容
// /album?id=136644109

//歌手专辑
// /artist/album?id=6452&limit=30

import { request } from "./request";

let api = {
    sub : '/artist/sub',
    songTop50: '/artist/top/song',
    sublist: '/artist/sublist',
    desc: '/artist/desc',
    mv: '/artist/mv',
    simi: '/simi/artist',
    album: '/album',
    artistAlbum:'/artist/album',
    artistDetail:'/artist/detail'
}

/**
 * 
 * @param {*} id 歌手id
 * @param {*} operation 收藏操作
 * @returns 收藏/取消 axios实例
 */
export function _getSub(id,operation){
    return request({
        url:api.sub,
        params:{
            id:id,
            t:operation
        },
        withCredentials: true
    })
}

/**
 * 
 * @param {*} id 歌手id
 * @returns 歌手热门50首个axios实例
 */
export function _getSongTop50(id){
    return request({
        url:api.songTop50,
        params:{
            id:id
        },
        withCredentials: true
    })
}

/**
 * 
 * @param {*} id 歌手id
 * @returns 类似歌手axios实例
 */
export function _getSimiArtist(id){
    return request({
        url:api.simi,
        params:{
            id:id
        },
        withCredentials: true
    })
}
/**
 * 
 * @param {*} id 歌手id
 * @returns 歌手详细
 */
export function _getDesc(id){
    return request({
        url:api.desc,
        params:{
            id:id
        },
        withCredentials: true
    })
}

/**
 * 
 * @param {*} id 歌手id
 * @returns 用户收藏列表
 */
 export function _getSubList(id){
    return request({
        url:api.sublist,
        params:{
            id:id,
            timestamp:Date.now()
        },
        withCredentials: true
    })
}
/**
 * 
 * @param {*} id 歌手id
 * @param {*} limit 一次查询个数
 * @param {*} offset 分页偏移（页数-1）*limit
 * @returns 
 */
export function _getArtistAlbum(id,limit,offset){
    return request({
        url:api.artistAlbum,
        params:{
            id:id,
            limit:limit,
            offset:offset
        },
        withCredentials:true
    })
}
export function _getAlbumSongs(id){
    return request({
        url:api.album,
        params:{
            id:id,
        },
        withCredentials:true
    })
}

export function _getArtistDetail(id){
    return request({
        url:api.artistDetail,
        params:{
            id:id,
        },
        withCredentials:true
    })
}