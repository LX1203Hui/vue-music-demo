import { request } from './request';

const api = {
   hot: '/playlist/hot',
   catlist: '/playlist/catlist',
   //精品歌单
   top: '/top/playlist',
   highquality: '/top/playlist/highquality',
};
/**
 *
 * @returns 歌单热门分类
 */
export function _getPlaylistHot() {
   return request({
      url: api.hot,
   });
}
/**
 *
 * @returns 歌单分类
 */
export function _getPlaylistCatlist() {
   return request({
      url: api.catlist,
   });
}
export function _getTopPlaylist(order, cat, limit, offset) {
   return request({
      url: api.top,
      params: {
         order,
         cat,
         limit,
         offset,
      },
      withCredentials: true,
   });
}
export function _getTopPlaylistHighquality(cat, limit, before) {
   return request({
      url: api.highquality,
      params: {
         cat,
         limit,
         before,
      },
   });
}
