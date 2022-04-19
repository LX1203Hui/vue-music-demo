
<script setup>
import { ref, defineProps } from 'vue';
import { useStore } from 'vuex';
import ArtistComp from '../../../components/artist/ArtistComp.vue';
import moment from 'moment';
const store = useStore();
const playIt = item => {
   store.commit('setSingle', item);
};
const props = defineProps({
   data: {
      type: Array,
      default: new Array(),
   },
   page: {
      type: Number,
      default: 1,
   },
});
const al = id => {
   console.log('专辑', id);
};
</script>

<template>
  <div class="table-daily">
    <table>
      <thead>
        <tr>
          <td></td>
          <td></td>
          <td>音乐标题</td>
          <td>歌手</td>
          <td>专辑</td>
          <td>时长</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in data"
            :key="item.id"
            @dblclick.capture="playIt(item)">
          <td>{{(index+1+((page-1)*30)<10)?'0'+(index+1+((page-1)*30)):index+1+((page-1)*30)}}</td>
          <td></td>
          <td>{{item.name}}<span>{{(item.alia.length)?'('+(item.alia).join('/')+')':''}}</span></td>
          <td>
            <artist-comp :artists="item.ar"></artist-comp>
          </td>
          <td><a @click.prevent="al(item.al.id)">{{item.al.name}}</a></td>
          <td>{{moment(item.dt).format('mm:ss')}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* table > thead {
   text-align: left;
} */
table {
   width: 100%;
   border-collapse: collapse;
   text-align: left;
}
table > thead {
}
td:nth-child(1) {
   text-align: center;
}
tr {
   border-radius: 2px;
   height: 40px;
   transition: all 500ms cubic-bezier(0.23, 1, 0.32, 1);
}
tr:nth-child(2n) {
   background: rgba(249, 249, 249);
}
tr:hover {
   background: rgba(200, 200, 200);
}
a:hover {
   text-align: left;
   color: red;
}
tbody > tr > td:nth-child(3) > span {
   color: var(--Ga4_t);
   font-size: 14px;
}
</style>
