<script setup>
import { onMounted, ref, defineProps } from 'vue';

const props = defineProps({
   data: {
      Array,
      default: null,
   },
});
const playStyle = {
   width: '25%',
   height: '25%',
   zIndex: '10',
   background: 'rgba(255,255,255,0.8)',
   color: 'red',
   borderRadius: '50%',
};
</script>

<template>
  <div class="privatecontent-item"
       v-if="data.length!=0">
    <div v-for="item in data"
         :key="item.id">
      <div class="img">
        <img :src="item.sPicUrl"
             alt="">
      </div>
      <a href="#"
         :title="item.name">{{item.name}}</a>
    </div>
  </div>
</template>

<style scoped>
.img > img {
   border-radius: 12px;
   width: 100%;
   height: 100%;
   object-fit: initial;
}
.privatecontent-item {
   display: flex;
   justify-content: center;
   align-items: center;
}
.privatecontent-item > div {
   width: 33.33%;
   box-sizing: border-box;
   padding: 5px;
}
.privatecontent-item a {
   display: inline-block;
   width: 100%;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
}
</style>
