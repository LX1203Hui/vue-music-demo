import { request } from './request';

const fm = {
   fm: '/personal_fm',
};
const song = {
   detail: '/song/detail',
   lyric: '/lyric',
};

export function _getFm() {
   return request({
      url: fm.fm,
      withCredentials: true,
   });
}
/**
 *
 * @param {*} str 传参为所有的歌的id拼接的字符串 ，如 ：12333，14423，12344
 * @returns
 */
export function _getSongDetail(str) {
   return request({
      url: song.detail,
      params: { ids: str },
      withCredentials: true,
   });
}
/**
 *
 * @param {*} id
 * @returns 歌词
 */
export function _getSongLyric(id) {
   return request({
      url: song.lyric,
      params: {
         id,
      },
   });
}
