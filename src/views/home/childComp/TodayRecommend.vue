<script setup>
import { _getDailySongs } from '../../../network/discover';
import { getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCookies } from 'vue3-cookies';
import store from '../../../store';
const { cookies } = useCookies();
const router = useRouter();
let time = new Date().getDate();
const bus = getCurrentInstance().appContext.app.config.globalProperties.$bus;
const leave = () => {
   if (cookies.isKey('__csrf')) {
      router.push('/dailysongs');
   } else {
      bus.emit('foo');
   }
};
const playAll = () => {
   if (cookies.isKey('__csrf')) {
      _getDailySongs()
         .then(result => {
            store.commit('setSongList', result.data.data.dailySongs);
         })
         .catch(err => {
            console.log(err);
         });
   } else {
      bus.emit('foo');
   }
};
const playStyle = {
   width: '25%',
   height: '25%',
   zIndex: '10',
   background: 'rgba(255,255,255,0.8)',
   color: 'red',
   borderRadius: '50%',
   marginLeft: '-12.5%',
   marginTop: '-12.5%',
};
</script>

<template>
  <div>
    <div class="today-recommend border">
      <div>
        <div class="today-blur">
          <div>
            <img src="../../../assets/images/recommend.jpg"
                 alt="">
            <div>
              <font-awesome-icon :icon="['far','calendar']" />
              <span>{{time}}</span>
            </div>

          </div>
          <play-comp @click.capture.stop="playAll()"
                     :playStyle="playStyle"
                     :playRightBottom="true"
                     :playOpacity="true" />
        </div>
      </div>
      <a href="#"
         @click.prevent="leave()">每日歌曲推荐</a>
    </div>
  </div>
</template>
<style scoped>
.today > div {
   position: relative;
   background: url('') center center no-repeat;
   background-size: cover;
   border-radius: 5%;
   overflow: hidden;
   width: 80%;
   height: 80%;
}
.today-recommend {
   width: 100%;
   background: var(--songsheet);
   border: 3px solid white;
   border-radius: 12px;
   position: relative;
   margin: 0 auto;
   margin: 5px;
}
.today-recommend > div {
   margin: 0 auto;
   position: relative;
   background-size: cover;
   border-radius: 5%;
   overflow: hidden;
   width: 99%;
}
.today-recommend img {
   width: 100%;
}
.today-blur {
   position: relative;
}
.today-blur > div:first-child > div {
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   backdrop-filter: blur(20px);
   color: white;
}
.today-blur > div:first-child > div > svg {
   width: 50%;
   height: 50%;
   position: absolute;
   top: 50%;
   left: 50%;
   margin-left: -25%;
   margin-top: -25%;
}
.today-blur > div:first-child > div > span {
   font-size: 2vw;
   font-weight: bold;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   margin-top: 45%;
}
a {
   display: inline-block;
   width: 80%;
   margin-top: 5px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
}
.today-recommend:hover .play-style {
   opacity: 1;
}
</style>
