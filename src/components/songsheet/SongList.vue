<!--  -->
<template>
  <div>
    <table>
      <tr>
        <th></th>
        <th>操作</th>
        <th>标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时间</th>
      </tr>
      <tr v-for="(item,index) in this.currList"
          :key="item.id"
          @dblclick.capture="playIt(item)">
        <template v-if="item.id!=-1">
          <td>{{pageStart+index+1}}</td>
          <td>
            <!-- <i class="fas fa-heart "></i> -->
            <i class="far fa-heart clr"></i><i class="far fa-arrow-alt-circle-down clr"></i>
          </td>
          <td>{{item.name}}<span>{{(item.alia.length)?'('+(item.alia).join('/')+')':''}}</span></td>
          <td>
            <span @click.capture.stop="user(i.id)"
                  v-for="i,idx in item.ar"
                  :key="i.id">
              <a @click="user(i.id)">{{i.name}}</a>
              {{(item.ar.length-1 == idx)?'':'/'}}
            </span>
          </td>
          <td><a @click.prevent="al(item.al.id)">{{item.al.name}}</a></td>
          <td>{{gett(item.dt)}}</td>
        </template>
        <template v-else>
          <td colspan="6"></td>
        </template>

      </tr>
    </table>
    <div class="page">
      <template v-for="item,index in pageNum"
                :key="item">
        <span v-if="item"
              :class="{'active':this.page==index+1}"
              @click="this.page=index+1">
          {{index+1}}
        </span>
      </template>

    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
   name: 'SongList',
   components: {},
   props: ['songlist'],
   data() {
      return {
         page: 0,
         currList: [],
         pageStart: 0,
      };
   },
   computed: {
      pageNum() {
         return Math.ceil(this.songlist.length / 10);
      },
   },
   watch: {
      page(newval) {
         this.pageStart = 10 * (newval - 1);
         let arr = this.songlist.slice(this.pageStart, this.pageStart + 10);
         if (arr.length < 10) {
            console.log('需要填充');
            let fill = new Array(10).fill({ id: -1 }, 0, 10);
            fill.splice(0, arr.length, ...arr);
            this.currList = fill;
         } else {
            this.currList = arr;
         }
      },
   },
   methods: {
      playIt(item) {
         this.$store.commit('setSingle', item);
      },
      al(id) {
         console.log('专辑', id);
      },
      user(id) {
         this.$router.push({ name: 'detail', query: { id: id } });
      },
      gett(dr) {
         return moment(dr).format('mm:ss');
      },
   },
   created() {},
   mounted() {
      this.page = 1;
   },
};
</script>

<style scoped>
table {
   border-collapse: collapse;
   width: 1200px;
   margin: 0 auto;
}
td,
th {
   text-align: left;
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
.page {
   padding: 10px;
}
.page span {
   display: inline-block;
   width: 40px;
   height: 40px;
   text-align: center;
   line-height: 40px;
   border-radius: 7px;
   border: 2px solid lavenderblush;
   margin: 0px 5px;
   transition: all 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
.page span:hover {
   background: rgb(200, 201, 202);
}
.page span:active {
   background: rgb(180, 181, 182);
}
.page .active {
   background: rgb(180, 181, 182);
}
</style>
