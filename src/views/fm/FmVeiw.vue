<script setup>
import { nextTick } from 'vue';
import { _getFm, _getSongLyric } from '../../network/musicplayer';
import Comment from '../../components/comment/Comment.vue';
import { _getMusicComment, _comment } from '../../network/comment';
import PlayComp from '../../components/play/PlayComp.vue';

import {
   onMounted,
   computed,
   watch,
   ref,
   getCurrentInstance,
   onBeforeMount,
} from 'vue';
import moment from 'moment';
import { useStore } from 'vuex';

const bus = getCurrentInstance().appContext.app.config.globalProperties.$bus;
let isPlay = computed(() => {
   return store.state.fm_isPlay;
});
let lyricObj = ref({});
let musicCommentData = ref({});
let content = ref('');
const store = useStore();

const play = () => {
   //bus 更改状态
   //
   //更改
   store.commit('setFmIsPlay', !isPlay.value);
};
const send = () => {
   //歌单回复 args  1:回复 id：歌单id  content：文本内容 2:类型指歌单
   if (content.value.length > 0) {
      _comment(1, fm_list.value[0].id, content.value, 0).then(res => {
         musicCommentData.value.comments.splice(0, 0, res.data.comment);
         alert('发表成功');
      });
   } else {
      alert('你没说什么可不能发送哦！');
   }
};
//fm歌曲数据
const getFm = async () => {
   if (fm_list.value.length == 0) {
      let res = await _getFm();
      store.commit('setFmStoreList', res.data.data);
      return res.data.data;
   }
};

const fm_list = computed(() => {
   return store.state.fm_store_list;
});
const fm_curTime = computed(() => {
   return store.state.fm_curTime;
});
//歌词部分
//获取并生成歌词对象
const getLyric = lyric => {
   let lyricList = lyric.lrc.lyric.split('\n');
   for (let item of lyricList) {
      if (item) {
         let list = item.split(']');
         for (let i = 0; i <= list.length - 2; i++) {
            list[i] = list[i].substring(1, list[i].length);
            lyricObj.value[list[i]] = list[list.length - 1];
         }
      }
   }
};
//加载歌词
const lyricIndex = computed(() => {
   let index = 0;
   for (let item in lyricObj.value) {
      if (item) {
         if (item < fm_curTime.value) {
            index++;
         }
      }
   }
   return index;
});
const fm_lyric_data = computed(() => {
   return store.state.fm_lyric;
});
//歌词数据
const getLyricData = async id => {
   let res = await _getSongLyric(id);
   store.commit('setFmLyric', res.data);
   return res.data;
};
const getMusicComment = async (id, limit) => {
   let res = await _getMusicComment(id, limit);
   return res.data;
};

//watch
//监视fm的歌词
watch(
   fm_lyric_data,
   newval => {
      getLyric(newval);
   },
   {
      deep: true,
   }
);
watch(
   fm_list,
   newval => {
      lyricObj.value = {};
      getLyricData(newval[0].id);
      let comment = async () => {
         let commentData = await getMusicComment(newval[0].id, 20);
         musicCommentData.value = commentData;
      };
      comment();
   },
   {
      deep: true,
   }
);
onMounted(async () => {
   await getFm();
   await getLyricData(fm_list.value[0].id);
   let commentData = await getMusicComment(fm_list.value[0].id, 20);
   musicCommentData.value = commentData;
   nextTick(() => {
      scrollTo(0, 0);
   });
});
// onBeforeMount(() => {
//    bus.off('play');
// });
const playStyle = {
   width: '10%',
   height: '10%',
   zIndex: '10',
   background: 'rgba(255,255,255,0.8)',
   color: 'red',
   borderRadius: '50%',
};
</script>

<template>
  <div class="fm">
    <div class="fm-content">
      <div class="fm-img">
        <img :src="(fm_list.length<=0)?'./src/assets/musicIMG.jfif':('' || `${fm_list[0].album.picUrl}?param=700y700`)"
             alt="">
        <play-comp class="fm-play"
                   :style="playStyle"
                   @click.capture.stop="play"
                   :playRightBottom="!isPlay"
                   :playCenter="isPlay"></play-comp>
      </div>
      <div class="fm-lyric"
           v-if="fm_list">
        <div class="lyric-content"
             :style="`transform: translateY(calc(-15px - 30px * ${lyricIndex}));`">
          <p v-for="item,index in lyricObj"
             :key="item"
             :class="{'active-lyric':fm_curTime==index}"><span v-show="false">{{index}}</span>{{(item=='')?'~伴奏~':item}}</p>
        </div>

      </div>
    </div>
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
    <div class="fm-comment">
      <comment :comments="musicCommentData.hotComments"
               type="精彩评论"
               v-if="
        musicCommentData.hotComments && musicCommentData.hotComments.length > 0
      ">
      </comment>
      <comment :comments="musicCommentData.comments"
               type="最新评论"
               :total="musicCommentData.total">
      </comment>
    </div>
  </div>
</template>

<style scoped>
.fm {
   margin: 150px auto;
}
.fm-lyric {
   overflow: hidden;
   overflow-y: scroll;
   height: 100%;
}
.fm-content {
   padding-top: 1vh;
   display: flex;
   justify-content: center;
   align-items: center;
   height: 50vh;
}
.fm-img {
   position: relative;
   width: 40vw;
   max-width: 500px;
}
.fm-img > img {
   width: 100%;
}
.fm-lyric {
   width: 50vw;
   font-size: 20px;
   position: relative;
}
.lyric-content {
   transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
   position: absolute;
   top: 50%;
   left: 0;
   right: 0;
   color: var(--Ga7);
}
.lyric-content > p {
   transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
   letter-spacing: 1px;
   line-height: 30px;
}
.fm-lyric > p {
   position: relative;
   margin-left: 20px;
}
.fm-lyric p > span {
   position: absolute;
   left: 0;
}
.active-lyric {
   transform: scale(1.3);
   font-weight: bold;
   text-shadow: 0px 0px 2px currentColor;
   color: red;
}
.fm-comment {
   padding: 5vh 0vh 10vh;
}
.taking {
   width: 600px;
   margin: 0 auto;
   text-align: right;
   padding-top: 5vh;
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
   border-radius: 12px;
   transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
}
button:hover {
   background: rgb(201, 201, 202);
   transform: scale(1.1);
}
button:active {
   background: rgb(181, 182, 183);
}
</style>
