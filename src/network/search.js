import { request } from './request';
const api = {
   detail: '/search/hot/detail',
   suggest: '/search/suggest',
   cloudsearch: '/cloudsearch',
};

export function _getHotDetail() {
   return request({
      url: api.detail,
      withCredentials: true,
   });
}
export function _getSuggest(keywords) {
   return request({
      url: api.suggest,
      params: {
         keywords,
      },
      // withCredentials: true,
   });
}
/**
 *
 * @param {*} keywords 关键词
 * @param {*} type 类型
 * @param {*} offset 分页 （页数 - 1）* limit
 * @param {*} limit 返回数量 默认 30个
 * @returns
 */
export function _getCloudSearch(keywords, type, offset, limit) {
   return request({
      url: api.cloudsearch,
      params: {
         keywords,
         type,
         offset,
         limit,
      },
   });
}
