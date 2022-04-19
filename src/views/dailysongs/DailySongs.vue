<script setup>
import { _getDailySongs } from '../../network/discover';
import SongSheet from './childComp/SongsSheet.vue';
import DailyTabel from './childComp/DailyTabel.vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { useCookies } from 'vue3-cookies';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import SongsSheet from './childComp/SongsSheet.vue';
const store = useStore();
const router = useRouter();
const route = useRoute();
const { cookies } = useCookies();
let time = new Date().getDate();
const dailysongsData = ref({ data: {} });
const dailysongSheetData = ref({});

const getDailySongs = async () => {
   let res = await _getDailySongs();
   return res.data;
};
const getDailySongSheet = async () => {
   let res = await axios({
      url: 'http://localhost:3000/recommend/resource',
      params: {
         timestamp: Date.now(),
      },
      withCredentials: true,
   });
   return res.data.recommend;
};
const playAll = () => {
   store.commit('setSongList', dailysongsData.value.data.dailySongs);
};

onMounted(async () => {
   dailysongsData.value = await getDailySongs();
   dailysongSheetData.value = await getDailySongSheet();
});
</script>
<script>
</script>
<template>
  <div class="daily-container">
    <div class="dailysongs">
      <div class="daily-header">
        <div class="daily-time">
          <font-awesome-icon :icon="['far','calendar']" />
          <span>{{time}}</span>
        </div>
        <div>
          <h2>每日歌曲推荐</h2>
          <span>根据你的音乐口味生成，每日6:00更新</span>
        </div>
      </div>
      <div class="operation">
        <button style="transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;"
                @click="playAll()">
          <i class="far fa-play-circle"></i>播放全部
        </button>
      </div>
      <div class="daily-table">
        <daily-tabel :data="dailysongsData.data.dailySongs" />
      </div>
    </div>
    <div class="daily-songsheet">
      <songs-sheet :songSheetList="dailysongSheetData"
                   type="猜你喜欢"></songs-sheet>
    </div>
  </div>

</template>
<style scoped>
.daily-container {
   padding: 80px 0px;
   margin: 0 auto;
   width: 80vw;

   display: flex;
}
.dailysongs {
   width: 80%;
}
.daily-header {
   display: flex;
   justify-content: left;
   align-items: center;
   margin: 1vh 0px;
}
.daily-header > .daily-time {
   position: relative;
}
.daily-header > div:nth-child(2) {
   text-align: left;
}
.daily-header > .daily-time > svg {
   width: 10vw;
   height: 10vw;
}
.daily-header > .daily-time > span {
   position: absolute;
   font-size: 5vw;
   font-weight: bold;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   /* margin: auto;   */
   margin-top: 3vw;
}
button {
   padding: 10px 20px;
   background: rgb(240, 241, 242);
   text-align: right;
   border: 2px solid white;
   border-radius: 12px;
}
button:hover {
   background: rgb(201, 201, 202);
   transform: scale(1.1);
}
button:active {
   background: rgb(181, 182, 183);
}
button,
i {
   font-size: 14px;
}
.operation {
   width: 100%;
   text-align: left;
   padding: 0px 10px 10px 10px;
   display: inline-block;
}
</style>
