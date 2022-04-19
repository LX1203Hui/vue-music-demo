<!--  -->
<template>
  <div>
    <div class="container border">
      <div class="content">
        <h3 v-if="type">
          <span class="type">{{ this.type }}<i class="fas fa-angle-right"></i></span>
        </h3>
        <div>
          <song-sheet v-for="item in songSheetList"
                      :key="item.id"
                      :data="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { numtostr } from '../../../utils/numberToStr';
import SongSheet from '../../../components/songsheet/SongSheet.vue';
import axios from 'axios';
export default {
   name: 'SongSheet',
   components: { SongSheet },
   props: ['songSheetList', 'type'],
   data() {
      return {};
   },
   computed: {},
   watch: {},
   methods: {
      play(id) {
         axios({
            url: `http://localhost:3000/playlist/track/all?id=${id}`,
            withCredentials: true,
         }).then(res => {
            this.$store.commit('songlist', res.data.songs);
         });
      },
      leave(id) {
         this.$router.push({ name: 'sheetdetailed', query: { id: id } });
      },
   },
   created() {},
   mounted() {},
};
</script>

<style scoped>
.container {
   width: 20vw;
   flex-wrap: nowrap;
   margin: 0 auto;
   z-index: 1;
   border-radius: 20px;
   margin-bottom: 30px;
   padding: 0px;
}
.container h4 span {
   float: right;
}
.type {
   display: inline-block;
   padding: 5px 10px;
   border: 2px solid pink;
   border-radius: 1em;
   margin: 10px;
}
h3 {
   text-align: left;
}
a {
   color: #fff;
   text-decoration: none;
}
a:hover {
   text-decoration: underline;
}
.content > div {
   overflow-y: scroll;
   overflow-x: hidden;
   height: 75vh;
}
.sheetList:hover .img > .play {
   opacity: 1;
}
.sheetList:hover .title {
   opacity: 1;
   transform: translateY(-20px);
}
.content > div > div {
   position: relative;
   display: inline-block;
   width: 80%;
   box-sizing: border-box;
}
.content > div > div > div {
   position: absolute;
}
.content div div img {
   width: 100%;
   border-radius: 10px;
}
.title {
   opacity: 0;
   font-size: 14px;
   text-align: center;
   color: #fff;
   top: 80%;
   transform: translateY(20px);
   transition: all 85ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
   width: 100%;
}
.img {
   width: 100%;
   height: 100%;
}
.img div {
   position: absolute;
}
.playCount {
   right: 10px;
   color: #fff;
   background: #333;
   padding-right: 6px;
   border-radius: 10px;
   opacity: 0.7;
}
.playCount span {
   display: flex;
   justify-content: center;
   align-items: center;
}
.play {
   opacity: 0;
   transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
   left: 50%;
   top: 70px;
   margin-left: -20px;
   border-radius: 50%;
   width: 40px;
   height: 40px;
   bottom: 22px;
   background: #fff;
   color: red;
   display: flex;
   justify-content: center;
   align-items: center;
}
.play:hover {
   box-shadow: 0px 0px 30px red;
}
.picUrl {
   width: 100%;
}
</style>
