import { request } from './request';

const api = {
   down: '/song/download/url',
};

export function _songDownload(id) {
   return request({
      url: api.down,
      params: {
         id,
      },
      withCredentials: true,
   });
}
