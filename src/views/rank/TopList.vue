<!--  -->
<template>
  <div v-if="this.toplist.code=='200'">
    <div class="container">
      <div class="content">
        <h1>官方榜</h1>
        <div class="rank">
          <top-list-item v-for="item in toplist.list.slice(0,4)"
                         :msg="item"
                         :key="item.id"></top-list-item>
        </div>
        <h1>全球榜</h1>
        <div class="songsheet">
          <!-- <sheet :songSheetList="toplist.list.slice(4)"></sheet> -->
          <song-sheet v-for="item in toplist.list.slice(4)"
                      :data="item"
                      :key="item.id"></song-sheet>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { _getRankList } from '../../network/discover.js';
import TopListItem from './childComps/TopListItem.vue';
// import Sheet from '../../components/songsheet/Sheet.vue';
import SongSheet from '../../components/songsheet/SongSheet.vue';

export default {
   name: 'TopList',
   components: {
      TopListItem,
      SongSheet,
   },
   props: {},
   data() {
      return {
         toplist: { list: [] },
      };
   },
   computed: {},
   watch: {},
   methods: {},
   created() {
      //list(排行榜) 和 artistToplist(歌手排行榜)
      _getRankList()
         .then(result => {
            this.toplist = result.data;
         })
         .catch(err => {
            console.log(err);
         });
   },
   mounted() {},
   beforRouterEnter() {},
};
</script>

<style scoped>
.container {
   max-width: 1200px;
   margin: 0 auto;
}
h1 {
   text-align: left;
   margin: 20px 10px;
}
.rank > div {
   margin: 10px 0px;
}
.songsheet {
   text-align: left;
}
.songsheet > div {
   display: inline-block;
   width: 20%;
   text-align: center;
   box-sizing: border-box;
   padding: 10px;
}
</style>
