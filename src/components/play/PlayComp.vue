<script setup>
import { defineProps } from 'vue';

const porps = defineProps({
   id: {
      type: Number,
      default: null,
   },
   playStyle: {
      type: Object,
      default: null,
   },
   playLeftTop: {
      type: Boolean,
      default: false,
   },
   playRightTop: {
      type: Boolean,
      default: false,
   },
   playLeftBottom: {
      type: Boolean,
      default: false,
   },
   playRightBottom: {
      type: Boolean,
      default: false,
   },
   playCenter: {
      type: Boolean,
      default: false,
   },
   playOpacity: {
      type: Boolean,
      default: false,
   },
});

// const playClassConfig = {
//    'play-style': true,
//    'play-left-top': porps.playLeftTop,
//    'play-right-top': porps.playRightTop,
//    'play-left-bottom ': porps.playLeftBottom,
//    'play-right-bottom': porps.playRightBottom,
//    'play-center': porps.playCenter,
//    'play-opacity': porps.playOpacity,
// };

const getId = id => {
   alert(`id:${id}`);
};
</script>

<template>
  <div @click="getId(id,category)"
       :style="playStyle"
       :class="{'play-style': true,
                'play-left-top': porps.playLeftTop,
                'play-right-top': porps.playRightTop,
                'play-left-bottom ': porps.playLeftBottom,
                'play-right-bottom': porps.playRightBottom,
                'play-center': porps.playCenter,
                'play-opacity': porps.playOpacity
                }">
    <font-awesome-icon style="color:red!important"
                       icon="play"
                       class="play-songsheet" />
  </div>
</template>

<style scoped>
.play-opacity {
   opacity: 0;
}
.play-style {
   position: absolute;
   display: flex;
   justify-content: center;
   align-items: center;
   top: 0;
   left: 0;
   right: auto;
   bottom: auto;
   margin: 5px;
   box-sizing: content-box;
   transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
}
.play-left-top {
   top: 0;
   left: 0;
   right: auto;
   bottom: auto;
   margin: 5px;
}
.play-right-top {
   top: 0;
   left: auto;
   right: 0;
   bottom: auto;
   margin: 5px;
}
.play-left-bottom {
   top: auto;
   left: 0;
   right: auto;
   bottom: 0;
   margin: 5px;
}
.play-right-bottom {
   top: auto;
   left: auto;
   right: 0;
   bottom: 0;
   margin: 5px;
}
.play-center {
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   margin: auto;
}
svg {
   width: 50%;
   height: 50%;
}
</style>
