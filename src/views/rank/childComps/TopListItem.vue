<!--  -->
<template>
  <div>
    <h2>{{this.name}}<i class="fas fa-angle-right"></i></h2>
    <div class="list">
      <div class="left">
        <img :src="coverImgUrl+'?param=200y200'"
             alt="">
        <p>{{updateFrequency}}</p>
        <play-comp @click.capture.stop="playAll(id)"
                   :playStyle="playStyle"
                   :playRightBottom="true"
                   :playOpacity="true"></play-comp>
      </div>
      <div>
        <table>
          <tr @dblclick="play(item)"
              v-for="(item,index) in songs.songs"
              :key="item.id">
            <td>{{index+1}}</td>
            <td>{{item.name}}<span v-if="item.alia.length!=0">{{`（${item.alia.join('/')}）`}}</span></td>
            <td>
              <span @click.capture.stop="user(i.id)"
                    v-for="i,idx in item.ar"
                    :key="i.id">
                <a @click="user(i.id)">{{i.name}}</a>
                {{(item.ar.length-1 == idx)?'':'/'}}
              </span>
            </td>
          </tr>
        </table>
        <a @click.prevent="about(id)"
           style="font-size:14px;">查看更多<i class="fas fa-angle-right"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import { _getSongList } from '../../../network/details.js';
import PlayComp from '../../../components/play/PlayComp.vue';
export default {
   name: 'TopListItem',
   components: {},
   props: {
      msg: Object,
   },
   data() {
      return {
         songs: [],
         playStyle: {
            width: '25%',
            height: '25%',
            zIndex: '10',
            background: 'rgba(255,255,255,0.8)',
            color: 'red',
            borderRadius: '50%',
            marginLeft: '-12.5%',
            marginTop: '-12.5%',
         },
      };
   },
   computed: {},
   watch: {},
   methods: {
      playAll(id) {
         _getSongList(id).then(res => {
            this.$store.commit('setSongList', res.data.songs);
         });
      },
      play(item) {
         // let arr = [];
         // arr.push(item);
         this.$store.commit('setSingle', item);
      },
      user(id) {
         this.$router.push({ name: `detail`, query: { id: id } });
      },
      about(id) {
         this.$router.push({ name: 'sheetdetailed', query: { id: id } });
      },
   },
   created() {
      _getSongList(this.id, 5).then(res => {
         this.songs = res.data;
      });
   },
   mounted() {},
   setup(props) {
      return {
         coverImgUrl: props.msg.coverImgUrl,
         name: props.msg.name,
         id: props.msg.id,
         updateFrequency: props.msg.updateFrequency,
      };
   },
};
</script>

<style scoped>
td {
   text-align: left;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
}
.list {
   display: flex;
   justify-content: left;
   align-items: center;
   position: relative;
}
.list > div:nth-child(2) {
   flex: 1 1 auto;
}
h2 {
   text-align: left;
   padding-left: 30px;
}
tr {
   border-radius: 2px;
   transition: all 500ms cubic-bezier(0.23, 1, 0.32, 1);
}
tr:nth-child(2n) {
   background: rgba(249, 249, 249);
}
tr:hover {
   background: rgba(200, 200, 200);
}
td:nth-child(1) {
   width: 5%;
   text-align: center;
   color: red;
   font-weight: bold;
}
td:nth-child(2) {
   width: 70%;
}
td:nth-child(2) > span {
   color: rgb(152, 152, 152);
   font-size: 14px;
}
td:nth-child(3) {
   text-align: right;
   width: 25%;
   padding-right: 10px;
   color: rgb(152, 152, 152);
}
td:nth-child(3) > span {
   margin-left: 5px;
}
table {
   width: 100%;
   box-sizing: border-box;
   border-collapse: collapse;
   height: 180px;
}
a:hover {
   text-align: left;
   color: red;
}
i {
   color: red;
}
.left {
   position: relative;
}
.left > p {
   position: absolute;
   top: 0px;
}
/* .left > div {
   display: flex;
   justify-content: center;
   align-items: center;
   width: 50px;
   height: 50px;
   top: 50%;
   margin-top: -25px;
   background: rgba(255, 255, 255, 0.5);
   border-radius: 50%;
   left: 50%;
   margin-left: -25px;
   opacity: 0;
   transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
} */
.left:hover div {
   opacity: 1;
}
.left > p {
   right: 0;
   display: inline-block;
   padding: 7px;
   background: rgba(43, 43, 43, 0.3);
   color: rgba(249, 249, 249);
   border-radius: 0px 0px 0px 15px/15px 15px 0px 15px;
}
h2 {
   margin: 20px 0px;
}
</style>
