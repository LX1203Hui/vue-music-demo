<!--  -->
<template>
  <div>
    <div class="bg"
         :style="bg"></div>
    <back></back>
    <div class="container">

      <div class="content">

        <div class="songer">
          <div class="cls">
            <div class="detail border">
              <div>
                <h2 id="name">{{artistDetail.name}}</h2>
                <span>{{artistDetail.transNames && artistDetail.transNames.join('/') || '暂无'}}</span>
              </div>
              <div>
                <span>
                  <p>{{artistDetail.musicSize}}</p>
                  <p>歌曲</p>
                </span>
                <span>
                  <p>{{artistDetail.albumSize}}</p>
                  <p>专辑</p>
                </span>
                <span>
                  <p>{{artistDetail.mvSize}}</p>
                  <p>MV</p>
                </span>
              </div>
              <div>
                <i :class="[this.isSub?'fas':'far','fa-star',this.isSub?'change':'']"
                   :style="{color:(this.isSub)?'red':'gray',fontSize:'28px'}"
                   @click="sub()">
                </i>
              </div>
            </div>
            <div class="briefDesc">
              <h4>简介：</h4>
              <p :class="{'bri':!this.descShow}">{{artistDetail.briefDesc}}<i class="fas fa-caret-down drop-down"
                   :class="{'rotate':this.descShow,'rotate1':!this.descShow}"
                   @click="this.descShow=!this.descShow"></i></p>
            </div>
            <div class="songtop50">
              <table-songs :id="this.$route.query.id"
                           titl="热门50首">
              </table-songs>
            </div>
            <div class="album">
              <div v-for="item in albumList.hotAlbums"
                   :key="item.id"
                   class="album-content">
                <!-- isSub -->
                <div>
                  <img :src="`${item.blurPicUrl}?param=200y200`">
                  <p>发行时间：{{tomoment(item.publishTime)}}</p>
                </div>
                <table-songs :id="item.id"
                             :titl="item.name">
                </table-songs>
              </div>
            </div>
            <div class="desc">
              <div v-if="introduction.introduction.length>0">
                <template v-for="item in introduction.introduction"
                          :key="item.id">
                  <h4>{{item.ti}}</h4>
                  <p v-html="item.txt"></p>
                </template>
              </div>
              <div v-else>
                <p>{{introduction.briefDesc}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Back from '../../components/back/back.vue';
import {
   _getSubList,
   _getSongTop50,
   _getArtistAlbum,
   _getAlbumSongs,
   _getDesc,
   _getSub,
   _getArtistDetail,
} from '../../network/artist.js';
import TableSongs from './childComps/TableSongs.vue';
import moment from 'moment';
import { nextTick } from '@vue/runtime-core';
export default {
   name: 'ArtistById',
   components: {
      Back,
      TableSongs,
   },
   props: {},
   data() {
      return {
         descShow: false,
         isSub: false,
         top50: [],
         albumList: {},
         introduction: { introduction: [] },
         artistDetail: {},
      };
   },
   computed: {
      bg() {
         return `background:url('${this.artistDetail.cover}') center center no-repeat`;
      },
      //background:url('songer1.png') center center no-repeat;
   },
   watch: {},
   methods: {
      sub() {
         //{
         //  "code": 200,
         //  "message": "success",
         //  "data": null
         // }
         if (this.isSub) {
            //取消收藏
            _getSub(this.$route.query.id, 2).then(res => {
               if (res.data.message == 'success') {
                  this.isSub = false;
               }
            });
         } else {
            //成功收藏
            _getSub(this.$route.query.id, 1).then(res => {
               if (res.data.message == 'success') {
                  this.isSub = true;
               }
            });
         }
      },
      getArtistDetail() {
         _getArtistDetail(this.$route.query.id).then(res => {
            this.artistDetail = res.data.data.artist;
         });
      },
      getAlbumList() {
         _getArtistAlbum(this.$route.query.id, 5).then(res => {
            this.albumList = res.data;
         });
      },
      getDesc() {
         _getDesc(this.$route.query.id).then(res => {
            this.introduction = res.data;
         });
      },
      tomoment(time) {
         return moment(time).format('YYYY-MM-DD');
      },
   },
   created() {
      _getSubList()
         .then(res => {
            let arr = res.data.data;
            arr.forEach(item => {
               if (item.id == this.$route.query.id) {
                  this.isSub = true;
               }
            });
         })
         .catch(err => {
            console.log(err.state == 301);
         });
      this.getArtistDetail();
      this.getAlbumList();
      this.getDesc();
   },
   mounted() {
      nextTick(() => {
         scrollTo(0, 0);
      });
   },
   beforeRouterEnter() {},
};
</script>

<style scoped>
* {
   margin: 0px;
   padding: 0px;
}
i {
   font-size: 28px;
}
h3 {
   text-align: left;
   padding-left: 30px;
}
h4 {
   text-align: left;
}
html,
body,
.bg {
   width: 100%;
   height: 100%;
}
.songer {
   width: 100%;
   height: auto;
}
.border {
   background: #e8e8e8;
   border: 1px solid #e8e8e8;
   border-radius: 1em;
   transition: all 0.3s;
   box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
   padding: 30px;
}
.cls {
   width: 100%;
   opacity: 0;
   overflow: hidden;
   animation: cls 1s 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
   backdrop-filter: blur(20px);
   box-sizing: border-box;
   padding: 30px;
   transform-origin: 0% 0%;
}
.cls > div {
   margin-bottom: 30px;
}
.bg {
   animation: img 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
   filter: blur(30px);
   overflow: hidden;
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: auto;
   z-index: 0;
}
.songer {
   max-width: 1200px;
   margin: 0 auto;
   margin-top: 50vh;
}
.cls {
   background-color: #e8e8e8;
   border-radius: 10px;
}
.detail {
   display: flex;
   animation: cls 1.3s 300ms cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
   transform-origin: 0% 0%;
}
.detail div {
   margin-right: 30px;
   vertical-align: middle;
}
.detail div:nth-child(2) {
   display: flex;
   justify-content: center;
   align-items: center;
}
.detail div:nth-child(2) > span {
   margin: 0px 10px;
}
.detail div:nth-child(3) {
   float: right;
   flex: 1 1 1px;
   text-align: right;
   line-height: 53px;
}
.album-content {
   display: flex;
   justify-content: left;
   align-items: flex-start;
   margin: 20px 0px;
}
.album-content > div:nth-child(1) {
   width: 200px;
   margin-right: 20px;
}
.album-content img {
   border-radius: 10px;
}
.change {
   animation: i 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}
.drop-down {
   float: right;
   margin-right: 5px;
   text-align: center;
   transform-origin: 41px 14px;
}
.briefDesc {
   transition: all 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
.briefDesc p {
   text-align: left;
   text-indent: 2em;
   width: 100%;
}
.bri {
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
}
.rotate {
   animation: rotate 300ms cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}
.rotate1 {
   animation: rotate1 300ms cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

@keyframes rotate {
   0% {
      transform: rotate(0deg);
   }
   100% {
      transform: rotate(180deg);
   }
}
@keyframes rotate1 {
   0% {
      transform: rotate(180deg);
   }
   100% {
      transform: rotate(0deg);
   }
}
@keyframes img {
   0% {
      background-size: 160vw;
      filter: blur(100px);
      opacity: 0;
   }
   100% {
      background-size: 100vw;
      filter: blur(0);
      opacity: 1;
   }
}
@keyframes cls {
   0% {
      opacity: 0;
      transform: scale(0);
   }
   100% {
      opacity: 1;
      transform: scale(1);
   }
}
@keyframes i {
   0% {
      transform: scale(0);
   }
   100% {
      transform: scale(1);
   }
}
</style>
