
<template>
  <div>
    <div class="songs-table">
      <daily-tabel :data="searchResult.songs"
                   :page="curPage" />
    </div>
    <div class="playlist-page">
      <span :class="{'page-unuse':curPage==1}"
            @click="prePage()">
        <font-awesome-icon icon="angle-left" />
      </span>
      <span v-for="item in Math.ceil(searchResult.songCount/30)"
            :class="{'active':curPage==item}"
            :key="item"
            @click="changePage(item)">
        {{item}}
      </span>
      <span :class="{'page-unuse':Math.ceil(searchResult.songCount/30)==curPage}"
            @click="nextPage()">
        <font-awesome-icon icon="angle-right" />
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';
import DailyTabel from '../../dailysongs/childComp/DailyTabel.vue';

import { _getCloudSearch } from '../../../network/search';
import { list } from 'postcss';
const route = useRoute();
const searchResult = ref({ songCount: 0 });
let curPage = ref(1);
const prePage = () => {
   if (curPage.value != 1) {
      curPage.value--;
   }
};
const nextPage = () => {
   if (curPage.value != Math.ceil(searchResult.value.songCount / 30)) {
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
      1,
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
   searchResult.value = await getCloudSearch(route.query.keywords);
});
</script>

<style scoped>
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
