<script setup>
import { defineProps } from 'vue';
import ArtistComp from '../artist/ArtistComp.vue';

const props = defineProps({
   data: {
      type: Object,
      default: null,
   },
   index: {
      type: Number,
      default: -1,
   },
   currIndex: {
      type: Number,
      default: -1,
   },
});
const emit = defineEmits(['changeIndex']);

const changeIndex = index => {
   emit('changeIndex', index);
};
const playStyle = {
   width: '50%',
   height: '50%',
   zIndex: '10',
   background: 'rgba(255,255,255,0.8)',
   color: 'red',
   borderRadius: '50%',
};
</script>


<template>
  <div @click="changeIndex(index)"
       :class="{'newsong-active':index==currIndex,'newsong-content':true}">
    <div class="newsong-img">
      <img :src="`${data.picUrl}?param=50y50`"
           alt="">
      <play-comp :id="data.id"
                 :playStyle="playStyle"
                 :playCenter="true"
                 :playOpacity="true" />
    </div>
    <div class="newsong-msg">
      <div><span>{{data.name}}</span></div>
      <div class="newsong-artists">
        <artist-comp :artists="data.song.artists"
                     fontSize="14px"
                     color="#333">
        </artist-comp>
      </div>
    </div>
  </div>
</template>


<style scoped>
.newsong-msg > div:nth-child(1) > span {
   display: inline-block;
   width: 100%;
}
.newsong-content > .newsong-img {
   position: relative;
}
.newsong-content:hover .playStyle {
   opacity: 1;
}
.newsong-artists {
   overflow: hidden;
}
</style>
