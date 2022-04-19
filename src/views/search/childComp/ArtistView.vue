
<template>
  <div>
    <div class="search-artist">
      <div v-for="item in searchResult.artists"
           :key="item.id"
           @click="$router.push({name:`detail`,query:{id:item.id}})">
        <div class="search-artist-img"><img :src="`${item.img1v1Url}?param=200y200`"
               alt=""></div>
        <div class="search-artist-msg">
          <div>{{item.name}}<span v-if="item.alias && item.alias.length!=0">({{item.alias.join('/')}})</span></div>
        </div>
      </div>
    </div>
    <div class="playlist-page">
      <span :class="{'page-unuse':curPage==1}"
            @click="prePage()">
        <font-awesome-icon icon="angle-left" />
      </span>
      <span v-for="item in Math.ceil(searchResult.artistCount/30)"
            :class="{'active':curPage==item}"
            :key="item"
            @click="changePage(item)">
        {{item}}
      </span>
      <span :class="{'page-unuse':Math.ceil(searchResult.artistCount/30)==curPage}"
            @click="nextPage()">
        <font-awesome-icon icon="angle-right" />
      </span>
    </div>
  </div>
</template>

<script setup>
import { _getCloudSearch } from '../../../network/search';
import { computed, ref, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

// const data = {
//    id: 51448468,
//    name: '丢飞花',
//    picUrl:
//       'https://p2.music.126.net/WsrhC8svw7sVloAgB5lWMg==/109951167154033889.jpg',
//    alias: [],
//    albumSize: 6,
//    picId: 109951167154033890,
//    img1v1Url:
//       'https://p2.music.126.net/O28Yyu1nktMdOsfm-gKezQ==/109951167153830250.jpg',
//    accountId: 364606776,
//    img1v1: 109951167153830260,
//    mvSize: 0,
//    followed: false,
//    trans: null,
// };
const searchResult = ref({ artistCount: 0 });
let curPage = ref(1);
const prePage = () => {
   if (curPage.value != 1) {
      curPage.value--;
   }
};
const nextPage = () => {
   if (curPage.value != Math.ceil(searchResult.value.artistCount / 30)) {
      curPage.value++;
   }
};
const changePage = item => {
   curPage.value = item;
};
const getCloudSearch = async (keywords, type, offset, limit) => {
   let res = await _getCloudSearch(keywords, type, offset, limit);
   return res.data.result;
};

watch(curPage, async newval => {
   let limit = 30;
   searchResult.value = await getCloudSearch(
      route.query.keywords,
      100,
      (newval - 1) * limit,
      limit
   );
});
const keywords = computed(() => {
   return route.query.keywords;
});
watch(keywords, async newval => {
   searchResult.value = await getCloudSearch(newval);
});
onBeforeMount(async () => {
   searchResult.value = await getCloudSearch(route.query.keywords, 100);
});
</script>

<style scoped>
.search-artist-img {
   width: 80px;
   margin: 10px;
}
img {
   width: 100%;
   border-radius: 50%;
}
.search-artist > div {
   display: flex;
   justify-content: left;
   align-items: center;
   box-sizing: border-box;
   font-size: 25px;
   border: 2px solid white;
   border-radius: 20px;
   margin: 10px;
   transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
}
.search-artist > div:hover {
   background: #e0e0e0;
}
.search-artist-msg {
   margin: 10px;
}
.search-artist-msg span {
   color: var(--Ga4_t);
   font-size: 20px;
}
.playlist-page {
   padding: 10px;
   text-align: right;
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
</style>
