<script setup>
import { defineProps } from 'vue';
import PlayComp from '../play/PlayComp.vue';
import { useRouter } from 'vue-router';
import { _getSongList } from '../../network/details';
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter();
const props = defineProps({
   data: {
      type: Object,
      default: null,
   },
});
const getSongList = async id => {
   let res = await _getSongList(id);
   return res.data;
};
const playAll = async id => {
   let listData = await getSongList(id);
   store.commit('setSongList', listData.songs);
};

const leave = id => {
   router.push({ name: 'sheetdetailed', query: { id: id } });
};

const playStyle = {
   width: '25%',
   height: '25%',
   zIndex: '10',
   background: 'rgba(255,255,255,0.8)',
   color: 'red',
   borderRadius: '50%',
   marginLeft: '-12.5%',
   marginTop: '-12.5%',
};
</script>

<template>
  <div style="vertical-align: top;">
    <div class="today">
      <div>
        <div class="today-img"
             style="">
          <img :src="`${data.picUrl || data.coverImgUrl}?param=200y200`"
               alt=""
               @click="leave(data.id)">
          <play-comp :id="data.id"
                     @click.capture.stop="playAll(data.id)"
                     :playStyle="playStyle"
                     :playRightBottom="true"
                     :playOpacity="true" />
        </div>

      </div>
      <a href="#"
         @click.prevent="leave(data.id)"
         :title="data.name">{{data.name}}</a>
    </div>
  </div>
</template>
<style scoped>
.today-img:hover .play-style {
   opacity: 1;
}
</style>
