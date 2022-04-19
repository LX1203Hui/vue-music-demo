<!--  -->
<template>
  <div>
    <div id="songsheet"
         class="border">
      <!-- <p>{{this.dl.playlist.id}}</p>  -->
      <div class="sheetImg">
        <img :src="`${this.dl.playlist.coverImgUrl}?param=200y200`"
             alt="">
      </div>
      <div class="songsheet-detail">
        <h3>{{this.dl.playlist.name}}</h3>
        <p>
          <span>歌曲数：{{this.dl.playlist.trackCount}}</span>
          <span>播放数：{{numToStr(this.dl.playlist.playCount)}}</span>
        </p>
        <p>
          <span>创建时间：{{this.getCreatetime}}</span>
          <span>最新更新时间：{{this.getUpdatatime}}</span>
        </p>
        <p>
          <span><img :src="`${this.dl.playlist.creator.avatarUrl}?param=30y30`"
                 alt=""></span>
          <span>{{this.dl.playlist.creator.nickname}}</span>
        </p>
        <p>标签：<span v-for="(item,index) in this.dl.playlist.tags"
                :key="item">
            <a @click="leave(item)">{{item}}</a>
            {{(index==this.dl.playlist.tags.length-1)?'':'/'}}
          </span></p>
        <p>简介：{{this.dl.playlist.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import { numtostr } from '../../utils/numberToStr';
export default {
   name: 'SongsheetDetailed',
   components: {},
   props: ['detailed'],
   data() {
      return {
         dl: _.cloneDeep(this.detailed),
      };
   },
   computed: {
      getUpdatatime() {
         return moment(this.dl.playlist.updateTime).format('YYYY-MM-DD');
      },
      getCreatetime() {
         return moment(this.dl.playlist.createTime).format('YYYY-MM-DD');
      },
   },
   watch: {},
   methods: {
      numToStr(num) {
         return numtostr(num);
      },
      leave(item) {
         this.$router.push({ name: 'playlist', params: { tag: item } });
      },
   },
   created() {},
   mounted() {},
};
</script>

<style scoped>
#songsheet {
   display: flex;
   justify-content: left;
   width: 1200px;
   margin: 0 auto;
   margin-bottom: 30px;
}
.sheetImg {
   width: 200px;
   height: 200px;
   margin-right: 20px;
}
.sheetImg > img {
   border-radius: 1em;
}
.songsheet-detail {
   text-align: left;
}
.songsheet-detail > p {
   margin: 10px;
}
.songsheet-detail span {
   margin-right: 10px;
}
.songsheet-detail > p {
   display: flex;
   justify-content: left;
   align-items: center;
}
.songsheet-detail img {
   border-radius: 50%;
}
.border {
   background: #e8e8e8;
   border: 1px solid #e8e8e8;
   border-radius: 1em;
   transition: all 0.3s;
   box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
   padding: 30px;
}
a:hover {
   color: red;
}
</style>
