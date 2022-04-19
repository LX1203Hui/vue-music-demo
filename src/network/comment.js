import { request } from './request';

// limit: 取出评论数量 , 默认为 20

// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值

// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)

let api = {
   playlist: '/comment/playlist',
   comment: '/comment',
   musicComment: '/comment/music',
};

export function _momentPlaylist(id, limit = 10, page = 1) {
   let offset = (page - 1) * limit;
   return request({
      url: api.playlist,
      params: {
         id,
         limit,
         offset,
      },
   });
}
export function _comment(t, id, content, type, commentId) {
   if (commentId) {
      return request({
         url: api.comment,
         params: {
            t,
            id,
            content,
            type,
            commentId,
            timestamp: Date.now(),
         },
         withCredentials: true,
      });
   } else {
      return request({
         url: api.comment,
         params: {
            t,
            id,
            content,
            type,
            timestamp: Date.now(),
         },
         withCredentials: true,
      });
   }
}
export function _getMusicComment(id, limit = 20) {
   return request({
      url: api.musicComment,
      params: {
         id,
         limit,
      },
   });
}
