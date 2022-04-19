import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/HomePage.vue';
import SingleView from '../views/search/childComp/SingleView.vue';
import PlaylistView from '../views/search/childComp/PlaylistView.vue';
import ArtistView from '../views/search/childComp/ArtistView.vue';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
const routes = [
   { path: '/', component: Home },
   {
      path: '/fm',
      name: 'fm',
      component: () => import('../views/fm/FmVeiw.vue'),
   },
   {
      path: '/toplist',
      name: 'toplist',
      component: () => import('../views/rank/TopList.vue'),
   },
   {
      path: '/playlist',
      name: 'playlist',
      component: () => import('../views/playlist/PlayList.vue'),
   },
   {
      path: '/sheetdetailed',
      name: 'sheetdetailed',
      component: () => import('../views/sheetdetail/SheetDetailed.vue'),
   },
   {
      path: '/artist',
      name: 'artist',
      component: () =>
         import(/* webpackChunkName: "about" */ '../views/artist/About.vue'),
   },
   {
      path: '/artist/detail',
      name: 'detail',
      component: () =>
         import(
            /* webpackChunkName: "about" */ '../views/artist/ArtistDetail.vue'
         ),
      children: [
         {
            path: '',
            name: 'detail',
            component: () =>
               import(
                  /* webpackChunkName: "about" */ '../views/artist/ArtistDetail.vue'
               ),
         },
      ],
   },
   {
      path: '/dailysongs',
      name: 'dailysongs',
      component: () => import('../views/dailysongs/DailySongs.vue'),
      beforeEnter: (to, from) => {
         if (cookies.isKey('__csrf')) {
            return true;
         } else {
            return false;
         }
      },
   },
   {
      path: '/userdetail',
      name: 'userdetail',
      component: () =>
         import(
            /* webpackChunkName: "sheetdetailed" */ '../views/userDetail/UserDetail.vue'
         ),
   },
   {
      path: '/userupdate',
      name: 'userupdate',
      component: () =>
         import(
            /* webpackChunkName: "sheetdetailed" */ '../components/user/UserUpdate.vue'
         ),
   },
   {
      path: '/search',
      name: 'search',
      component: () => import('../views/search/SearchView.vue'),
      children: [
         {
            path: '',
            name: 'single',
            component: SingleView,
         },
         {
            path: 'playlists',
            name: 'playlists',
            component: PlaylistView,
         },
         {
            path: 'artists',
            name: 'artists',
            component: ArtistView,
         },
      ],
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});
export default router;
