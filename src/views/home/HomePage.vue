<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import BannerSwiper from './childComp/BannerSwiper.vue';
import TodayRecommend from './childComp/TodayRecommend.vue';
import PrivateContent from './childComp/PrivateContent.vue';
import SongSheet from '../../components/songsheet/SongSheet.vue';
import NewSong from '../../components/songsheet/NewSong.vue';
import MvComp from '../../components/mv/MvComp.vue';

import {
   _getSongSheetList,
   _getPrivatecontent,
   _getNewSong,
   _getMv,
} from '../../network/discover';

const store = useStore();
//初始值
let songSheetData = ref({
   result: [],
});
let privatecontentData = ref({
   result: [],
});
let newSongData = ref({
   result: [],
});
let mvData = ref({
   result: [],
});
let currIndex = ref(-1);

const changeIndex = index => {
   currIndex.value = index;
};
const song = song => {
   if (song) {
      store.commit('setSingle', song);
   }
};

//axios请求的数据
const getSongSheetData = limit => {
   _getSongSheetList(limit)
      .then(result => {
         songSheetData.value = result.data;
      })
      .catch(err => {
         console.log(err);
      });
};
const getPrivatecontent = () => {
   _getPrivatecontent()
      .then(result => {
         privatecontentData.value = result.data;
      })
      .catch(err => {
         console.log(err);
      });
};
const getNewSong = limit => {
   _getNewSong(limit)
      .then(result => {
         newSongData.value = result.data;
      })
      .catch(err => {
         console.log(err);
      });
};
const getMv = () => {
   _getMv()
      .then(result => {
         mvData.value = result.data;
      })
      .catch(err => {
         console.log(err);
      });
};
onMounted(() => {
   getSongSheetData(9);
   getPrivatecontent();
   getNewSong(12);
   getMv();
});
</script>
<template>
  <div class="home">
    <div class="banner">
      <banner-swiper />
    </div>
    <div class="information">
      <h3>推荐歌单</h3>
      <div class="songlist"
           v-if="songSheetData.result!=undefined">

        <today-recommend />
        <song-sheet v-for="item in songSheetData.result"
                    :key="item.id"
                    :data="item" />
      </div>
      <h3>独家放送</h3>
      <div class="privatecontent">
        <private-content :data="privatecontentData.result" />
      </div>
      <h3>最新音乐</h3>
      <div class="newsong">
        <new-song v-for="(item,index) in newSongData.result"
                  @click.capture.stop="song(item.song)"
                  :index="index"
                  :currIndex="currIndex"
                  :key="item.id"
                  :data="item"
                  @changeIndex="changeIndex"></new-song>
      </div>
      <h3>推荐MV</h3>
      <div class="mv">
        <mv-comp v-for="item in mvData.result.slice(0,3)"
                 :data="item"
                 :key="item.id"></mv-comp>
      </div>
    </div>

  </div>
</template>
<style scoped>
svg {
   width: 20px;
}
h3 {
   text-align: left;
   margin-left: 20px;
}
.home {
   padding: 70px 0px;
}
</style>
