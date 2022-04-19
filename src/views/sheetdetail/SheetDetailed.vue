<!--  -->
<template>
  <div style="background: #e8e8e8; padding: 30px 0px;padding:70px 0px;">
    <back />
    <songsheet-header :detailed="this.detailed"
                      v-if="!(this.detailed.playlist == undefined)">
    </songsheet-header>
    <div class="operation-sheet">
      <button class="border"
              @click="playAll()">
        <i class="far fa-play-circle"></i>播放全部
      </button>
    </div>
    <song-list :songlist="songList"
               v-if="this.songList.length"> </song-list>
    <div class="taking">
      <div class="taking-content">
        <i class="far fa-keyboard"></i>
        <textarea class="border"
                  name="textarea"
                  autofocus
                  draggable
                  placeholder="给大家讲讲看你的想法..."
                  v-model="content">
        </textarea>
      </div>
      <div>
        <button class="border"
                @click="send()">
          <i class="fas fa-long-arrow-alt-left"></i>发表
        </button>
      </div>
    </div>
    <comment :comments="this.commentData.hotComments"
             type="精彩评论"
             v-if="
        this.commentData.hotComments && this.commentData.hotComments.length > 0
      ">
    </comment>
    <comment :comments="this.commentData.comments"
             type="最新评论"
             :total="this.commentData.total">
    </comment>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

import SongList from '../../components/songsheet/SongList.vue';
import SongsheetHeader from '../../components/songsheet/SongsheetHeader.vue';
import Back from '../../components/back/back.vue';
import Comment from '../../components/comment/Comment.vue';

import { _momentPlaylist, _comment } from '../../network/comment';

export default {
   name: 'SheetDetailed',
   components: {
      SongsheetHeader,
      SongList,
      Back,
      Comment,
   },
   data() {
      return {
         detailed: {},
         songList: [],
         commentData: {},
         content: '',
      };
   },
   computed: {},
   watch: {},
   methods: {
      ///playlist/detail?id=24381616
      getdetailed() {
         axios({
            url: `http://localhost:3000/playlist/detail?id=${this.$route.query.id}&s=0`,
            withCredentials: true,
         }).then(res => {
            this.detailed = _.cloneDeep(res.data);
         });
      },
      getSongList() {
         //  /playlist/track/all?id=24381616&limit=10
         axios({
            url: `http://localhost:3000/playlist/track/all?id=${this.$route.query.id}`,
            withCredentials: true,
         }).then(res => {
            this.songList = res.data.songs;
         });
      },
      getComment() {
         _momentPlaylist(this.$route.query.id, 40).then(res => {
            this.commentData = res.data;
         });
      },
      back() {
         this.$router.go(-2);
      },
      playAll() {
         this.$store.commit('setSongList', this.songList);
      },
      send() {
         //歌单回复 args  1:回复 id：歌单id  content：文本内容 2:类型指歌单
         if (this.content.length > 0) {
            _comment(1, this.$route.query.id, this.content, 2).then(res => {
               this.commentData.comments.splice(0, 0, res.data.comment);
            });
         } else {
            alert('你没说什么可不能发送哦！');
         }
      },
   },
   beforeCreate() {},
   created() {},
   mounted() {
      this.getdetailed();
      this.getSongList();
      this.getComment(this.$route.query.id);
   },
};
</script>

<style scoped>
.border {
   border-radius: 1em;
   transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
   box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
}
.taking {
   width: 600px;
   margin: 0 auto;
   text-align: right;
}
.taking-content {
   position: relative;
}
.taking-content > i {
   position: absolute;
   top: 15px;
   left: 3px;
   color: #fff;
}
.taking-content textarea {
   width: 100%;
   height: 180px;
   margin: 10px 0px;
   padding: 20px;
   font-family: initial;
   font-size: 16px;
   resize: none;
   background: rgb(240, 241, 242);
   outline: none;
   border-radius: 10px;
   border: 3px solid white;
   box-sizing: border-box;
}
button {
   padding: 10px 20px;
   background: rgb(240, 241, 242);
   text-align: right;
   border: 2px solid white;
}
button:hover {
   background: rgb(201, 201, 202);
   transform: scale(1.1);
}
button:active {
   background: rgb(181, 182, 183);
}
.operation-sheet {
   max-width: 1200px;
   text-align: center;
   margin: 0 auto;
}
</style>
