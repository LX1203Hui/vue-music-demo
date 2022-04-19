<script setup>
import { defineProps } from 'vue';
import ArtistComp from '../artist/ArtistComp.vue';
const props = defineProps({
   data: {
      type: Object,
      default: null,
   },
});
const getId = id => {
   alert(id);
};
</script>

<template>
  <div class="mv-item"
       @click="getId(data.id)">
    <div class="mv-pic">
      <div class="mv-img">
        <img :src="`${data.picUrl}?param=300y170`"
             alt="">
      </div>
      <div class="mv-copywriter"><span>{{data.copywriter}}</span></div>
      <div class="mv-playcount">

        <span>
          <font-awesome-icon icon="play" />
          {{data.playCount}}
        </span>
      </div>
    </div>
    <div class="mv-msg">
      <div>
        <div class="mv-name"><span>{{data.name}}</span></div>
        <artist-comp :artists="data.artists"
                     fontSize="14px"
                     color="#333">
        </artist-comp>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mv-playcount span,
svg {
   line-height: 31px;
}
svg {
   font-size: 12px;
}
</style>
