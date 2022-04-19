<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { _generateObj } from '../../utils/catlist.js';
import SongSheet from '../../components/songsheet/SongSheet.vue';
import {
   _getPlaylistHot,
   _getPlaylistCatlist,
   _getTopPlaylistHighquality,
   _getTopPlaylist,
} from '../../network/playlist';
const route = useRoute();

let show = ref(false);
let curIndex = ref(1);
let limit = 100;

const playlistHot = ref({ tags: { name: '' } });
const playlistCatlist = ref({ all: {}, sub: [], categories: {} });
const curCategory = ref({ name: '' });
const curHighquality = ref({});
const playlist = ref({ total: 0 });
const changeCategory = item => {
   curCategory.value = item;
   show.value = false;
};

const isShow = () => {
   show.value = !show.value;
};
const changePage = async item => {
   curIndex.value = item;
   playlist.value = await getTopPlaylist(
      'hot',
      curCategory.value.name,
      limit,
      (item - 1) * limit
   );
};
const prePage = async () => {
   if (curIndex.value != 1) {
      curIndex.value--;
      playlist.value = await getTopPlaylist(
         'hot',
         curCategory.value.name,
         limit,
         (curIndex.value - 1) * limit
      );
   }
};
const nextPage = async () => {
   if (playlist.value.more) {
      curIndex.value++;
      playlist.value = await getTopPlaylist(
         'hot',
         curCategory.value.name,
         limit,
         (curIndex.value - 1) * limit
      );
   }
};

const getPlaylistHot = async () => {
   let res = await _getPlaylistHot();
   return res.data;
};
const getTopPlaylist = async (order, cat, limit, offset) => {
   let res = await _getTopPlaylist(order, cat, limit, offset);
   return res.data;
};
const getPlaylistCatlist = async () => {
   let res = await _getPlaylistCatlist();
   return res.data;
};
const getTopPlaylistHighquality = async (cat, limit, before) => {
   let res = await _getTopPlaylistHighquality(cat, limit, before);
   return res.data.playlists;
};
const loadImg = src => {
   var promise = new Promise(function (resolve, reject) {
      var img = document.createElement('img');
      img.onload = function () {
         resolve(img);
      };
      img.onerror = function () {
         reject();
      };
      img.src = src;
   });
   return promise;
};

const bg = computed(() => {
   return `background:url(${curHighquality.value[0].coverImgUrl}?param=200y200) no-repeat;background-size: 100% 100%;`;
});
const catlist = computed(() => {
   return _generateObj(playlistCatlist.value);
});
watch(
   curCategory,
   async newval => {
      curIndex.value = 1;
      playlist.value = await getTopPlaylist(
         'hot',
         newval.name,
         limit,
         (curIndex.value - 1) * limit
      );
      curHighquality.value = await getTopPlaylistHighquality(newval.name, 1);
   },
   {
      deep: true,
   }
);
onMounted(async () => {
   playlistHot.value = await getPlaylistHot();
   playlistCatlist.value = await getPlaylistCatlist();

   if (route.params.tag) {
      for (let item in catlist.value) {
         catlist.value[item].forEach(e => {
            if (e.name == route.params.tag) {
               curCategory.value = e;
               return;
            }
         });
      }
   } else {
      curCategory.value = catlist.value[0][0];
   }
});
</script>

<template>
  <div class="playlist">
    <div class="playlist-highquality"
         v-if="curHighquality[0]!=undefined"
         :style="bg">
      <div>
        <div class="highquality-img">
          <img :src="`${curHighquality[0].coverImgUrl}?param=200y200`"
               alt="">
        </div>
        <div>
          <div class="boutique">
            <font-awesome-icon icon="crown" />
            精品歌单
          </div>
          <h3>{{curHighquality[0].name}}</h3>
        </div>
      </div>

    </div>
    <div class="playlist-choose">
      <div class="operation">
        <button @click="isShow()"
                style="transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;">
          {{curCategory.name}}<i class="fas fa-angle-right"></i>
        </button>
        <div>
          <span v-for="item in playlistHot.tags"
                :key="item.id"
                @click="changeCategory(item)"
                :class="{'category-active':item.name==curCategory.name}">{{ playlistHot.tags && item.name}}</span>
        </div>
      </div>
      <div class="change-category border"
           v-show="show">
        <div class="category-all">
          <span :class="{'category-active':playlistCatlist.all.name==curCategory.name}"
                @click="changeCategory(playlistCatlist.all)">{{playlistCatlist.all && playlistCatlist.all.name}}</span>
        </div>
        <div class="categpry-list"
             v-for="item,index in playlistCatlist.categories"
             :key="item">
          <div>{{item}}</div>
          <div><span v-for="item1 in catlist[index]"
                  :class="{'category-active':item1.name==curCategory.name}"
                  :key="item1"
                  @click="changeCategory(item1)">{{ playlistCatlist.categories && item1.name}}
              <i class="hot"
                 v-if="item1.hot">HOT</i></span>

          </div>
        </div>
      </div>
    </div>
    <div class="playlist-content">
      <song-sheet v-for="item in playlist.playlists"
                  :data="item"
                  :key="item.id"></song-sheet>
    </div>
    <div class="playlist-page">
      <span :class="{'page-unuse':curIndex==1}"
            @click="prePage()">
        <font-awesome-icon icon="angle-left" />
      </span>
      <span v-for="item in Math.ceil(playlist.total/100)"
            :class="{'active':curIndex==item}"
            :key="item"
            @click="changePage(item)">
        {{item}}
      </span>
      <span :class="{'page-unuse':!playlist.more}"
            @click="nextPage()">
        <font-awesome-icon icon="angle-right" />
      </span>
    </div>
  </div>
</template>
<style scoped>
.playlist {
   padding: 80px 0px;
   width: 80vw;
   margin: 0 auto;
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
   display: flex;
   justify-content: space-between;
   align-items: center;
}
.operation span {
   padding: 5px;
}

span:hover {
   color: red;
}
.playlist-choose {
   position: relative;
   z-index: 998;
}
.change-category {
   width: 50vw;
   padding: 10px;
   border-radius: 12px;
   text-align: left;
}
.highquality-img {
   margin: 2%;
}
.change-category > div {
   margin: 10px;
}
.change-category span {
   display: inline-block;
   box-sizing: border-box;
   padding: 4px;
   width: 20%;
}
.change-category {
   position: absolute;
}
.change-category > .categpry-list > div:first-child {
   font-weight: bold;
   padding: 10px;
   border-bottom: 2px solid #e0e0e0;
}
.category-active {
   color: red;
}
.playlist-highquality {
   text-align: left;
   margin: 10px 0px;
   background-size: 100% 100%;
   border-radius: 20px;
   overflow: hidden;
   color: white;
}
.playlist-highquality > div {
   backdrop-filter: blur(30px);
}
.playlist-highquality > div > div {
   display: inline-block;
   vertical-align: middle;
}
.boutique {
   display: inline-block;
   padding: 5px 10px;
   border-radius: 100vh;
   border: 2px solid gold;
   margin: 10px;
}
.boutique > svg {
   color: gold;
}
.hot {
   font-size: 12px;
   color: red;
   transform: scale(0.8);
   display: inline-block;
   vertical-align: top;
}
.playlist-content {
   text-align: left;
}
.playlist-content > div {
   display: inline-block;
   width: 20%;
   padding: 5px 10px;
   box-sizing: border-box;
   text-align: center;
}
.playlist-page {
   padding: 10px;
}
.playlist-page span {
   display: inline-block;
   width: 40px;
   height: 40px;
   text-align: center;
   line-height: 40px;
   border-radius: 7px;
   border: 2px solid white;
   margin: 0px 5px;
   transition: all 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
.playlist-page span:hover {
   background: rgb(200, 201, 202);
}
.playlist-page span:active {
   background: rgb(180, 181, 182);
}
.playlist-page .active {
   background: rgb(180, 181, 182);
}
.page-unuse {
   color: #e0e0e0;
}
.page-unuse:hover {
   color: #e0e0e0;
   background: var(--bg) !important;
}
@media screen {
}
</style>
