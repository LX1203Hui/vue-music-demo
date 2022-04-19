<script setup>
import {
   onMounted,
   watch,
   ref,
   defineEmits,
   computed,
   reactive,
   nextTick,
   getCurrentInstance,
} from 'vue';
import { useStore } from 'vuex';
import _ from 'lodash';
import moment from 'moment';
import '@varlet/ui/es/style-provider/style/index.js';
import { _getFm, _getSongLyric } from '../../network/musicplayer';
import ArtistComp from '../artist/ArtistComp.vue';
import { moveName, pageVal } from '../../assets/js/test1';
import { _songDownload } from '../../network/download';
//ref只有在script内容访问是通过value()方法
//template内容直接用就可以；所以出现了无法在'boolean'上定义value值

const bus = getCurrentInstance().appContext.app.config.globalProperties.$bus;
//vuex
let store = useStore();
//实例
// const { proxy } = getCurrentInstance();

//变量
let curSong = ref({});
let isPlay = ref(false);
let volume = ref(50);
let isOffVolume = ref(true);
let listShow = ref(null);
let alltime = ref(0);
let artists = ref([]);
let songSheetIndex = ref(0);

//控制内容超出部分的内容显示 时钟（setInterval）
let moveContentTimer = ref('');

// 歌曲三种状态
let songState = ref({
   fm: false,
   single: false,
   songsheet: false,
});

//歌单
// const songlist = [];
let o = null;
let ox = null;
let mx = null;
let LABEL_DEADAULT = null;
let parent = null;
let progressWidth = null;
let label = null;

let lyric = ref({});
let lyricObj = {};
let currLyric = ref(null);
let lyricShow = ref(true);

//player初始化
const audio = document.createElement('audio');
const init = () => {
   const aplayer = document.getElementById('aplayer');
   audio.setAttribute('controls', '');
   audio.setAttribute('style', 'display:none');
   audio.src = '';
   audio.volume = volume.value / 100;
   aplayer.appendChild(audio);
   updateCurTime();
};

//操作player的函数
const play = () => {
   audio.play();
   usePlay();
};
const pause = () => {
   audio.pause();
   usePlay();
};
const next = () => {
   if (songState.value.fm) {
      fm_list.value.shift();
      nextTick(() => {
         store.commit('setFmIsPlay', false);
      });
   } else if (songState.value.single) {
      alert('没有下一首');
   } else if (songState.value.songsheet) {
      if (songlist.value.length - 1 == songSheetIndex.value) {
         songSheetIndex.value = 0;
      } else {
         songSheetIndex.value++;
      }
      curSong.value = songlist.value[songSheetIndex.value];
   }
};
const prev = () => {
   if (songState.value.songsheet) {
      if (songSheetIndex.value == 0) {
         songSheetIndex.value = songlist.value.length - 1;
      } else {
         songSheetIndex.value--;
      }
      curSong.value = songlist.value[songSheetIndex.value];
   }
};
const del = () => {
   // audio.src = '';
};
const usePlay = () => {
   if (audio.src == '') {
      alert('未获取到音音乐');
   } else {
      isPlay.value = !isPlay.value;
      if (songState.value.fm == true) {
         store.commit('setFmIsPlay', !isPlay.value);
      }
   }
};
const offVolume = () => {
   isOffVolume.value = !isOffVolume.value;
   if (!isOffVolume.value) {
      audio.muted = true;
      toggleTheme();
   } else {
      audio.muted = false;
      toggleTheme();
   }
};
const getLyricData = id => {
   lyricObj = {};
   _getSongLyric(id)
      .then(res => {
         lyric.value = res.data;
      })
      .catch(err => {
         console.log(err);
      });
};
const songDownload = async id => {
   let res = await _songDownload(id);
   return res.data;
};
const likeChang = () => {
   emits('updataLike', !props.like);
};
const changeVolume = val => {
   if (isOffVolume.value == false) {
      toggleTheme();
   }
   audio.volume = val / 100;
   isOffVolume.value = true;
   audio.muted = false;
};
const percentageCompu = val => {
   return Math.round(val * 10000) / 100;
};
//更新当前时间
const updateCurTime = () => {
   let s = (audio.currentTime * 1000000) / 1000;
   let curTime = moment(s).format('mm:ss');
   let currentTimeElem = document.querySelector('.currtime');
   currentTimeElem.innerHTML = curTime;
};
//获取并生成歌词对象
const getLyric = lyric => {
   let lyricList = lyric.lrc.lyric.split('\n');
   for (let item of lyricList) {
      if (item) {
         let list = item.split(']');
         for (let i = 0; i <= list.length - 2; i++) {
            list[i] = list[i].substring(1, list[i].length);
            lyricObj[list[i]] = list[list.length - 1];
         }
      }
   }
};
//加载歌词
const lodeLyric = s => {
   let curTimeM = moment(s).format('mm:ss:SSS');
   let lyricTime = null;
   for (let item in lyricObj) {
      if (item) {
         if (item < curTimeM) {
            lyricTime = item;
         }
      }
   }
   if (lyricObj[lyricTime] == '') {
      currLyric.value = '~伴奏~';
   } else {
      currLyric.value = lyricObj[lyricTime];
   }

   if (songState.value.fm == true) {
      store.commit('changeCurTimeFm', lyricTime);
   }
};
//重置songstate
const resetSongState = () => {
   songState.value = {
      fm: false,
      single: false,
      songsheet: false,
   };
};

//emits
const emits = defineEmits(['updataLike']);
const changeListShow = () => {
   if (listShow.value == 'anim-music-list-leave' || listShow.value == null) {
      listShow.value = 'anim-music-list';
   } else if (listShow.value == 'anim-music-list') {
      listShow.value = 'anim-music-list-leave';
   }
};
const picUrl = computed(() => {
   return (
      (curSong.value.al && curSong.value.al.picUrl) ||
      (curSong.value.album && curSong.value.album.picUrl)
   );
   // JSON.stringify(curSong) == '{}'
   //    ? 'src/assets/musicIMG.jfif'
   //    : '' || `${curSong.album && curSong.album.picUrl}?param=75y75`;
});
const fm_list = computed(() => {
   return store.state.fm_store_list;
});
const fm_play = computed(() => {
   return store.state.fm_isPlay;
});
const single = computed(() => {
   return store.state.single;
});
const songlist = computed(() => {
   return store.state.songlist;
});
const playHistory = computed(() => {
   return store.state.playHistory;
});
//watch
//监视当前歌曲状态,改变当前的音乐
watch(
   songState,
   newval => {
      if (newval.fm == true) {
         curSong.value = fm_list.value[0];
      } else if (newval.single == true) {
         curSong.value = single.value;
      } else if (newval.songsheet == true) {
         songSheetIndex.value = 0;
         curSong.value = songlist.value[songSheetIndex.value];
      }
   },
   {
      deep: true,
   }
);
//single
watch(
   single,
   newval => {
      resetSongState();
      songState.value.single = true;
   },
   {
      deep: true,
   }
);
watch(
   songlist,
   newval => {
      resetSongState();
      songState.value.songsheet = true;
   },
   {
      deep: true,
   }
);
let songDownloadData = ref({});
//fm-Play
watch(fm_play, newval => {
   if (newval == false) {
      if (songState.value.fm == true) {
         audio.play();
         isPlay.value = true;
      } else {
         songState.value.fm = true;
      }
   } else {
      if (songState.value.fm == true) {
         audio.pause();
         isPlay.value = false;
      }
   }
});
//fm_list
watch(
   fm_list,
   newval => {
      //重置
      resetSongState();
      //切换状态
      songState.value.fm = true;
      curSong.value = newval[0];
      //在pop()拿走之后
      if (newval.length == 1) {
         _getFm()
            .then(res => {
               store.commit('setFmStoreList', res.data.data);
            })
            .catch(err => {
               console.log(err);
            });
      }
   },
   {
      deep: true,
   }
);
//cursong 当前歌曲
watch(
   curSong,
   async newval => {
      if (newval == '') {
         resetSongState();
         isPlay.value = false;
         store.commit('setFmIsPlay', true);
      }
      store.commit('changeCurTimeFm', '');
      getLyricData(newval.id);
      //销毁之前的时钟
      clearInterval(moveContentTimer.value);
      const name = document.querySelector('.name');
      name.style = '';
      songDownloadData.value = await songDownload(newval.id);
      if (songDownloadData.value.data.url == null) {
         console.log(songDownloadData.value.data);
         return;
      } else {
         // audio.src = `https://music.163.com/song/media/outer/url?id=${newval.id}.mp3`;
         audio.src = songDownloadData.value.data.url;
      }

      nextTick(() => {
         let page = pageVal('.name');
         if (page > 0) {
            let a = moveName('.name');
            a();
            moveContentTimer.value = setInterval(() => {
               a();
            }, page * 1000 + 2000 + 2200);
         }
      });
      newval.artists
         ? (artists.value = newval.artists)
         : (artists.value = newval.ar);
      usePlay();
      isPlay.value = true;
      if (songState.value.fm) {
         store.commit('setFmIsPlay', false);
      } else {
         store.commit('setFmIsPlay', true);
      }
      audio.play();
      store.commit('setPlayHistory', newval);
   },
   {
      deep: true,
   }
);
watch(lyric, newval => {
   getLyric(lyric.value);
});
//computed
const volumeComp = computed(() => {
   if (volume.value >= 50) {
      return 'volume-up';
   } else if (volume.value <= 50 && volume.value > 0) {
      return 'volume-down';
   } else if (volume.value == 0) {
      return 'volume-off';
   }
});
const allTime = computed(() => {
   return moment(alltime.value).format('mm:ss');
});
//生命周期
onMounted(() => {
   store.commit('setFmIsPlay', false);
   resetSongState();
   init();
   progressWidth = document.querySelector('.progress-bar-width');
   label = document.querySelector('.progress-label');
   clearInterval(moveContentTimer.value);
   // getLyric();
   let page = pageVal('.name');
   if (page > 0) {
      let a = moveName('.name');
      a();
      moveContentTimer.value = setInterval(() => {
         a();
      }, page * 1000 + 2000 + 2200);
   }
});

//props
const props = defineProps({
   like: {
      type: Boolean,
      default: false,
   },
});
//varlet
const state = reactive({
   license: true,
});
const successTheme = {
   '--slider-thumb-block-background': '#888',
};
const styleVars = ref(null);

const toggleTheme = () => {
   styleVars.value = styleVars.value ? null : successTheme;
};

//audio event
audio.addEventListener('timeupdate', event => {
   let s = (audio.currentTime * 1000000) / 1000;
   //用于显示的
   let curTime = moment(s).format('mm:ss');
   //计算进度条宽度
   let percentage = percentageCompu(s / alltime.value);
   //加载时间
   let currentTimeElem = document.querySelector('.currtime');
   currentTimeElem.innerHTML = curTime;

   label.style = `left:${percentage}%`;
   progressWidth.setAttribute('style', `width:${percentage}%`);

   //加载歌词
   lodeLyric(s);
});
audio.addEventListener('ended', () => {
   // if (songlist.length <= 0) {
   //    isPlay.value = !isPlay.value;
   // }
   if (songState.value.fm) {
      fm_list.value.shift();
   } else if (songState.value.single) {
      audio.pause();
      isPlay.value = false;
   } else if (songState.value.songsheet) {
      if (songlist.value.length - 1 == songSheetIndex.value) {
         songSheetIndex.value = 0;
      } else {
         songSheetIndex.value++;
      }
      curSong.value = songlist.value[songSheetIndex.value];
   }
});
audio.oncanplay = function () {
   alltime.value = audio.duration * 1000;
};
audio.addEventListener(
   'error',
   function () {
      if (songState.value.fm == 'true') {
         alert('没有该音乐，将放下一首');
         next();
      }
   },
   true
);
const onMousedown = e => {
   o = e.target;
   parent = o.parentNode.clientWidth;
   ox = e.pageX;
   LABEL_DEADAULT = o.parentNode.parentNode.offsetLeft;
   mx = e.clientX;
   document.onmousemove = move; // 注册鼠标移动事件处理函数
   document.onmouseup = stop; // 注册松开鼠标事件处理函数
};
const move = function (event) {
   let percentage = percentageCompu(
      (event.clientX - LABEL_DEADAULT - 18) / parent
   );
   if (percentage <= 0) {
      o.style.left = '0%';
   } else if (percentage >= 100) {
      o.style.left = '100%';
   } else {
      o.style.left = `${percentage}%`;
      progressWidth.style.width = o.style.left;
   }
};
const stop = event => {
   ox = o.pageX;
   mx = event.clientX;
   audio.currentTime =
      (alltime.value * o.style.left.split('%')[0]) / 100 / 1000;
   o = document.onmousemove = document.onmouseup = null;
};
const onMousedownbg = e => {
   const width = e.target.parentNode.clientWidth;
   const x = e.target.parentNode.parentNode.offsetLeft;
   let percentage = percentageCompu((e.clientX - x - 18) / width);
   label.style.left = `${percentage}%`;
   progressWidth.style.width = label.style.left;
   audio.currentTime = (alltime.value * percentage) / 100 / 1000;
};

//store  vuex
const changePlayerLock = () => {
   store.commit('setPlayerLock');
};
const delHistory = id => {
   store.commit('movePlayHistory', id);
};
const playIt = item => {
   store.commit('setSingle', item);
};
const playAll = () => {
   store.commit('setSongList', playHistory.value);
   alert('全部播放成功！');
};
</script>

<template>

  <div class="music-player-content border border-rd-bottom">
    <div class="music-data">
      <div class="music-img">
        <img :src="picUrl || 'src/assets/musicIMG.jfif'"
             alt="">
      </div>
      <div class="music-msg">
        <p class="music-name">
          <span ref="musicName"
                class="name">{{(curSong && curSong.name )|| '没有歌曲 No music'}}</span>
        </p>
        <p class="music-artist"
           v-if="artists.length!=0">
          <artist-comp :artists="artists"
                       :fontsize="'12px'"></artist-comp>
        </p>
      </div>
      <!-- <span @click="likeChang"
            v-show="!like">
        <font-awesome-icon :icon="['far','heart']" />
      </span>
      <span @click="likeChang"
            v-show="like">
        <font-awesome-icon style="color:red"
                           :icon="['fas','heart']" />
      </span> -->
    </div>
    <div class="music-operation">
      <div class="operation">
        <span @click="del">
          <font-awesome-icon icon="trash-alt" />
        </span>
        <span @click="prev">
          <font-awesome-icon icon="step-backward" />
        </span>
        <span @click="play"
              v-show="!isPlay">
          <font-awesome-icon icon="play" />
        </span>
        <span @click="pause"
              v-show="isPlay">
          <font-awesome-icon icon="pause" />
        </span>
        <span @click="next">
          <font-awesome-icon icon="step-forward" />
        </span>
        <span @click="lyricShow=!lyricShow">
          词
        </span>
        <div v-show="lyricShow"
             ref="musicLyric"
             :class="{'music-lyric':true}">
          <span>{{currLyric}}</span>
        </div>
      </div>
      <div @mousedown="onMousedownbg($event)"
           class="music-progress-bar">
        <div class="musi-progress-bg">
        </div>
        <div class="progress-bar-width progress-trans"
             style="width: 0%;">
        </div>
        <div @mousedown.capture.stop="onMousedown($event)"
             class="progress-label progress-trans"
             style="left:0%">
        </div>
      </div>
      <div class="music-time">
        <span class="currtime"></span>/
        <span class="alltime">{{allTime}}</span>
      </div>
    </div>

    <div id="aplayer">
    </div>
    <div class="music-volume">
      <div class="music-volume-no"
           v-show="isOffVolume"
           @click="offVolume">
        <font-awesome-icon :icon="volumeComp" />
      </div>
      <div class="music-volume-off"
           v-show="!isOffVolume"
           @click="offVolume">
        <font-awesome-icon icon="volume-mute" />
      </div>
      <var-style-provider :style-vars="styleVars">
        <var-slider v-model="volume"
                    :active-color="(isOffVolume)?'':'#bdbdbd'"
                    @change="changeVolume" />
      </var-style-provider>
    </div>
    <div class="player-lock">
      <font-awesome-icon @click="changePlayerLock"
                         :icon="($store.state.isPlayerLock)?'lock':'lock-open'" />
    </div>
    <div class="music-list">
      <font-awesome-icon @click="changeListShow"
                         icon="list-ul" />
      <div class="music-list-show"
           :class="listShow">
        <h2>播放记录</h2>
        <div class="operation">
          <button style="transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;"
                  @click="playAll">
            <i class="far fa-play-circle"></i>播放全部
          </button>
        </div>
        <ul v-if="playHistory">
          <li v-for="item in playHistory"
              :class="{'play-history-active':curSong.id==item.id}"
              :key="item.id"
              @dblclick="playIt(item)">
            <span>{{item.name}}</span>
            <span>
              <artist-comp :artists="item.ar || item.artists"
                           :fontsize="'12px'"></artist-comp>
            </span>
            <span>{{ (item.dt && moment(item.dt).format('mm:ss')) ||  (item.hMusic && item.hMusic.playTime && moment(item.hMusic.playTime).format('mm:ss')) }}</span>
            <font-awesome-icon icon="trash-alt"
                               @click="delHistory(item.id)" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
h2 {
   margin: 10px 0;
}
ul {
   list-style: none;
   box-sizing: border-box;
   padding: 10px;
   font-size: 14px;
   height: 85%;
   overflow-y: auto;
}
li {
   padding: 8px;
   display: flex;
   align-items: center;
   transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
   border-radius: 5px;
}
li:hover {
   background: var(--rd);
}
.music-list li > span {
   display: inline-block;
   width: 33.33%;
   text-align: left;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
}
.music-list li > span:nth-child(3) {
   text-align: right;
   font-size: 14px;
   color: var(--Ga4_t);
}
li > svg {
   color: var(--Ga4_t);
   transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
   margin-left: 10px;
}
li > svg:hover {
   color: var(--Ga7);
}
button {
   padding: 5px 10px;
   background: rgb(240, 241, 242);
   text-align: right;
   border: 2px solid white;
   border-radius: 7px;
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
   font-size: 12px;
}
.operation {
   display: flex;
   justify-content: start;
   margin: 10px;
}
.play-history-active {
   background: var(--rd);
}
</style>