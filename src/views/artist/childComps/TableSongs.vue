<!--  -->
<template>
  <div style="display:flex;flex-direction: column;flex: 1 1 1px;">
    <div>
      <div class="operation">
        <button style="transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;"
                @click="playAll()">
          <i class="far fa-play-circle"></i>播放全部
        </button>
      </div>
      <h3>{{titl}}</h3>
      <table>
        <tr v-for="item,index in list10RoAll"
            :key="item.id"
            @dblclick="cl(item.id),checked(index),playIt(item)"
            :class="{checked:this.idx==index}">
          <td>{{index+1}}</td>
          <td>
            <!-- <i class="fas fa-heart "></i> -->
            <i class="far fa-heart clr"></i>
          </td>
          <td><i class="far fa-arrow-alt-circle-down clr"></i></td>
          <td>{{item.name}}<span v-if="item.alia.length>0">({{item.alia.join('/')}})</span></td>
          <td>{{tomoment(item.dt)}}</td>
        </tr>
        <tr>
          <td colspan="5"
              v-if="songs.length>10"><button @click="isShow=!isShow">{{(isShow)?'隐藏':'显示'+this.songs.length+'首歌'}}</button></td>
        </tr>
      </table>
    </div>

  </div>

</template>

<script>
import moment from 'moment';
import { _getAlbumSongs, _getSongTop50 } from '../../../network/artist';

export default {
   name: 'TableSongs',
   components: {},
   props: ['titl', 'id', 'type'],
   data() {
      return {
         idx: -1,
         isShow: false,
         songs: [],
         isSub: false,
      };
   },
   computed: {
      list10RoAll() {
         if (this.songs.length > 10 && this.isShow == false) {
            return this.songs.slice(0, 10);
         } else if (this.songs.length > 10 && this.isShow == true) {
            return this.songs;
         } else {
            return this.songs;
         }
      },
   },
   watch: {},
   methods: {
      getAlbumSongs(id) {
         return _getAlbumSongs(id).then(res => {
            return res;
         });
      },
      songls() {
         if (this.$route.query.id == this.id) {
            _getSongTop50(this.id).then(res => {
               this.songs = res.data.songs;
            });
         } else {
            _getAlbumSongs(this.id).then(res => {
               this.songs = res.data.songs;
            });
         }
      },
      playIt(item) {
         this.$store.commit('setSingle', item);
      },
      cl(i) {
         console.log(i);
      },
      checked(i) {
         this.idx = i;
      },
      tomoment(time) {
         return moment(time).format('mm:ss');
      },
      playAll() {
         this.$store.commit('setSongList', this.songs);
      },
   },
   created() {},
   mounted() {
      this.songls();
   },
};
</script>

<style scoped>
h3 {
   text-align: left;
   margin: 10px;
}
td:nth-child(4) {
   text-align: left;
}
table {
   width: 100%;
   border-collapse: collapse;
   transition: all 500ms cubic-bezier(0.215, 0.61, 0.355, 1);
}
td {
   padding: 10px 0px;
}
.clr {
   color: gray;
}
td:nth-child(1),
td:nth-child(2),
td:nth-child(3) {
   width: 3%;
}
td:nth-child(5) {
   text-align: right;
   padding-right: 30px;
}
.checked {
   background: rgb(201, 202, 203);
}
tr {
   transition: all 500ms cubic-bezier(0.215, 0.61, 0.355, 1);
}
tr:nth-child(2n-1) {
   background: rgba(249, 249, 249);
}
tr:hover {
   background: rgba(200, 200, 200);
}
td:nth-child(1) {
   text-align: center;
   color: gray;
   font-weight: bold;
}
button {
   padding: 10px 20px;
   background: rgb(240, 241, 242);
   text-align: right;
   border: 2px solid white;
   border-radius: 12px;
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
   font-size: 14px;
}
.operation {
   width: 1200px;
   margin: 0 auto;
   text-align: left;
   padding: 0px 10px 10px 10px;
   display: inline-block;
}
</style>
