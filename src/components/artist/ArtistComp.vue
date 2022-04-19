<script setup>
import { defineProps, onMounted, ref, watch, nextTick, toRefs } from 'vue';
import { moveName, pageVal } from '../../assets/js/test1';
import { useRouter } from 'vue-router';

const router = useRouter();

let moveContentTimer = ref('');

const props = defineProps({
   artists: {
      type: Array,
      default: new Array(),
   },
   fontsize: {
      type: String,
      default: '14px',
   },
   color: {
      type: String,
      default: '#333',
   },
});
const { artists } = toRefs(props);
watch(artists, newval => {
   clearInterval(moveContentTimer.value);
   const name = document.querySelector('.artists');
   name.style = '';
   nextTick(() => {
      let page = pageVal('.artists');
      if (page > 0) {
         let a = moveName('.artists');
         a();
         moveContentTimer.value = setInterval(() => {
            a();
         }, page * 1000 + 2000 + 2200);
      }
   });
});
const levse = id => {
   router.push({ name: `detail`, query: { id: id } });
};

onMounted(() => {});
const artist = id => {
   if (id) {
      levse(id);
   }
};

//参考数据
let obj = {
   artists: [
      {
         name: '杨和苏KeyNG',
         id: 13899303,
         picId: 0,
         img1v1Id: 0,
         briefDesc: '',
         picUrl:
            'http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
         img1v1Url:
            'http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
         albumSize: 0,
         alias: [],
         trans: '',
         musicSize: 0,
         topicPerson: 0,
      },
      {
         name: 'Vinida (万妮达)',
         id: 12001060,
         picId: 0,
         img1v1Id: 0,
         briefDesc: '',
         picUrl:
            'http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
         img1v1Url:
            'http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
         albumSize: 0,
         alias: [],
         trans: '',
         musicSize: 0,
         topicPerson: 0,
      },
   ],
};
</script>
<template>
  <div class="artists">
    <span class="artist-move"
          v-for="(item,index) in artists"
          :key="item.id">
      <span :style="{'fontSize':fontsize,'color':color}"
            @click.stop="artist(item.id)">{{item.name}}</span>{{(index<artists.length-1)?'/':''}}
    </span>
  </div>
</template>
<style scoped>
.artists {
   display: inline-block;
   white-space: nowrap;
}
.artists > span:hover {
   text-decoration: underline;
   color: var(--color-text);
}
</style>
