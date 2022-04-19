import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import vue3Cookies from 'vue3-cookies';
import { Slider, StyleProvider } from '@varlet/ui';
import '@varlet/ui/es/slider/style/index.js';
import '@varlet/ui/es/style-provider/style/index';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
import mitt from 'mitt';
import {
   faHeart as fasHeart,
   faPlay,
   faPause,
   faStepBackward,
   faStepForward,
   faTrashAlt,
   faVolumeDown,
   faVolumeUp,
   faVolumeOff,
   faVolumeMute,
   faListUl,
   faLock,
   faLockOpen,
   faXmark,
   faHouse,
   faHeadphones,
   faUsers,
   faSquarePollVertical,
   faCrown,
   faAngleLeft,
   faAngleRight,
   faSearch,
} from '@fortawesome/free-solid-svg-icons';
import {
   faHeart as farHeart,
   faCalendar as farCalendar,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
   fasHeart,
   farHeart,
   faPlay,
   faPause,
   faStepBackward,
   faStepForward,
   faTrashAlt,
   faVolumeDown,
   faVolumeUp,
   faVolumeOff,
   faVolumeMute,
   faListUl,
   faLock,
   faLockOpen,
   farCalendar,
   faXmark,
   faHouse,
   faHeadphones,
   faUsers,
   faSquarePollVertical,
   faCrown,
   faAngleLeft,
   faAngleRight,
   faSearch
);

const app = createApp(App)
   .use(store)
   .use(router)
   .component('font-awesome-icon', FontAwesomeIcon)
   .use(Slider)
   .use(vue3Cookies)
   .use(StyleProvider);

const bus = (app.config.globalProperties.$bus = mitt());

router.beforeEach((to, from, next) => {
   if (to.path == '/dailysongs') {
      if (cookies.isKey('__csrf')) {
         next();
      } else {
         bus.emit('foo');
         next({ path: '/' });
      }
   } else {
      next();
   }
});

app.mount('#app');
