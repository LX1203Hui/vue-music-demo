
<template>
  <div class="search">
    <div class="search-container">
      <div class="search-content">
        <input type="text"
               @click="focus"
               placeholder="搜索"
               v-model="content">
      </div>
      <div class="search-btn"
           @click="$router.push({name:'search',query:{keywords:content}})">
        <div class="button">
          <font-awesome-icon icon="search" />
        </div>
      </div>
    </div>
    <div class="search-result"
         @mouseleave="isShow=false"
         v-if="isShow">
      <ul v-if="order.length>0">
        <h3 v-if="order.includes('artists')">歌手</h3>
        <li v-for="item in artists"
            @click="$router.push({name:`detail`,query:{id:item.id}});isShow=false"
            :key="item.id">{{item.name}}</li>
        <h3 v-if="order.includes('songs')">单曲</h3>
        <li v-for="item in songs"
            :key="item.id"
            @click.capture="song(item)">{{item.name}}
          <artist-comp :artists="item.artists" />
        </li>
        <h3 v-if="order.includes('playlists')">歌单</h3>
        <li v-for="item in playlists"
            @click="$router.push({name:`sheetdetailed`,query:{id:item.id}});isShow=false"
            :key="item.id">{{item.name}}</li>
      </ul>
      <ul v-else
          class="hot-detail">
        <h3>热搜榜</h3>
        <li v-for="(item,index) in hotDetail"
            :key="item"
            @click="$router.push({path:'/search',query:{keywords:item.searchWord}})">
          <div>
            <span>{{index+1}}</span>
            <div>
              <p><span>{{item.searchWord}}</span><span>{{item.score}}</span><img v-if="item.iconUrl"
                     :src="item.iconUrl"
                     alt=""></p>
              <p v-if="item.content">{{item.content}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { useStore } from 'vuex';
import { _getHotDetail, _getSuggest } from '../../network/search';
const store = useStore();
const content = ref('');
const hotDetail = ref({});
let timer = null;
let artists = ref([]);
let songs = ref([]);
let order = ref([]);
let playlists = ref([]);
const isRock = ref(false);
const isShow = ref(false);
const focus = () => {
   isShow.value = true;
};
const song = item => {
   store.commit('setSingle', item);
   isShow.value = false;
};
const getHotDetail = async () => {
   let res = await _getHotDetail();
   return res.data.data;
};
const getSuggest = async keywords => {
   let res = await _getSuggest(keywords);
   return res.data.result;
};
watch(content, async newval => {
   isRock.value = true;
   if (timer) {
      clearTimeout(timer);
   }
   timer = setTimeout(function () {
      isRock.value = false;
   }, 500);
});
watch(isRock, async newval => {
   if (!newval && content.value) {
      let res = await getSuggest(content.value);
      artists.value = res.artists || [];
      songs.value = res.songs || [];
      order.value = res.order || [];
      playlists.value = res.playlists || [];
   }
   if (!content.value) {
      order.value = [];
   }
});
onBeforeMount(async () => {
   hotDetail.value = await getHotDetail();
});
</script>

<style scoped>
.search {
   width: 33%;
}
.search-container {
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   height: 40px;
   border: 3px solid #333;
   border-radius: 99px;
   overflow: hidden;
}
.search-container > .search-content {
   width: 85%;
   height: 100%;
}
input[type='text'] {
   width: 100%;
   height: 100%;
   box-sizing: border-box;
   outline: none;
   outline: none;
   padding: 10px;
   border: none;
}
.search-container > .search-btn {
   width: 15%;
   height: 100%;
   background: var(--lightcolor2);
   display: flex;
   justify-content: center;
   align-items: center;
   transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
}
.search-container > .search-btn:hover {
   background: var(--rd);
}
.search-result {
   position: absolute;
   width: 30%;
   height: 50vh;
   overflow-y: scroll;
}
ul {
   list-style: none;
   text-align: left;
   background: var(--lightcolor2);
   border-radius: 12px;
   border: 2px solid white;
}
li {
   padding: 8px;
   display: flex;
   overflow: hidden;
   justify-content: space-between;
   transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
   border-radius: 5px;
}
li:hover {
   background: var(--rd);
}
li > span:nth-of-type(2) {
   font-size: 13px;
   font-size: #aaa;
   line-height: 21px;
}
h3 {
   margin: 10px;
}
.hot-detail > li > div {
   display: flex;
   justify-content: center;
   align-items: center;
}
.hot-detail > li > div > span {
   margin: 10px;
}
.hot-detail > li > div > div > p > span,
img {
   padding: 0px 5px;
}
.hot-detail > li > div > div > p > span:nth-child(2) {
   color: #aaa;
   font-size: 13px;
}
.hot-detail > li > div > div {
   width: 100%;
}
.hot-detail > li > div > div > p:nth-child(2) {
   color: #aaa;
   font-size: 13px;
   display: inline-block;
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
}
img {
   height: 13px;
   object-fit: contain;
}
</style>
