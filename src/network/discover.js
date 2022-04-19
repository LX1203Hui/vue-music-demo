import { request } from './request';

const bannerApi = {
   banner: '/banner',
};

//需要登录
const recommend = {
   //每日推荐歌曲
   songs: '/recommend/songs',
};

const playlistApi = {
   //歌单分类
   catlist: '/playlist/catlist',
   tags: '/playlist/highquality/tags',
   //通过上面的tags获取
   highquality: '/top/playlist/highquality',
   //相关歌单推荐
   related: '/related/playlist',
   //歌单全部音乐
   all: '/playlist/track/all',
   //歌单收藏等信息
   dynamic: '/playlist/detail/dynamic',
};

const mvApi = {};

//电台暂时不考虑
// const djApi = {
//    //分类
//    catelist: '/dj/catelist',
// };

//个性化推荐（会根据用户不同提供不同的歌单）
const personalizedApi = {
   //歌单推荐
   personalized: '/personalized',
   //独家放送(入口列表)
   privatecontent: '/personalized/privatecontent',
   //独家放送列表
   privatecontentList: '/personalized/privatecontent/list',
   //推荐新歌
   newsong: '/personalized/newsong',
   mv: '/personalized/mv',
};
const rankApi = {
   //排行榜数据
   rank: '/toplist',
};

/**
 * 排行榜
 * @returns 排行榜的axios
 */
export function _getRankList() {
   return request({
      url: rankApi.rank,
   });
}
/**
 *
 * @returns banner
 */
export function _getBanner() {
   return request({
      url: bannerApi.banner,
      params: {
         type: 2,
      },
   });
}
/**
 *
 * @returns 获取每日推荐歌曲
 */
export function _getTodayRecommend() {
   return request({
      url: recommend.songs,
      params: {
         timestamp: Date.now(),
      },
      withCredentials: true,
   });
}
export function _getSongSheetList(limit) {
   return request({
      url: personalizedApi.personalized,
      params: {
         limit: limit,
      },
      withCredentials: true,
   });
}
export function _getPrivatecontent() {
   return request({
      url: personalizedApi.privatecontent,
   });
}
/**
 *
 * @param {*} limit 请求最新音乐个数
 * @returns
 */
export function _getNewSong(limit) {
   return request({
      url: personalizedApi.newsong,
      params: {
         limit: limit,
      },
   });
}
/**
 *
 * @returns mv推荐
 */
export function _getMv() {
   return request({
      url: personalizedApi.mv,
   });
}
/**
 *
 * @returns 每日推荐
 */
export function _getDailySongs() {
   return request({
      url: recommend.songs,
      params: {
         timestamp: Date.now(),
      },
      withCredentials: true,
   });
}
