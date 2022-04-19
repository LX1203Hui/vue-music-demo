<!--  -->
<template>
  <div class="userdetail">
    <div v-if="this.detail.level != undefined"
         class="content">
      <div class="user">
        <div class="left">
          <img :src="`${detail.profile.avatarUrl}`"
               alt="" />
        </div>
        <div class="right">
          <div style=""
               class="msg">
            <div>
              <h1>{{ detail.profile.nickname }}</h1>
              <span>Lv:{{ detail.level }}</span>
            </div>
            <div>
              <a href="#"
                 @click.prevent="send()"><i style="margin-right: 5px"
                   class="fas fa-pencil-alt"></i>编辑个人信息</a>
            </div>
          </div>
          <div class="top">
            <span>
              <h3>
                {{ detail && detail.profile && detail.profile.eventCount }}
              </h3>
              <span>动态</span>
            </span>
            <span>
              <h3>{{ detail && detail.profile && detail.profile.follows }}</h3>
              <span>关注</span>
            </span>
            <span>
              <h3>
                {{ detail && detail.profile && detail.profile.followeds }}
              </h3>
              <span>粉丝</span>
            </span>
          </div>
          <div>
            <p>
              所在地区:
              <span>{{ getProvince(this.detail.profile.province) }}</span>
              <span>{{ getCity(this.detail.profile.city) }}</span>
            </p>
          </div>
          <div>个人介绍：{{ detail.avatarDetail || '暂无介绍' }}</div>
        </div>
      </div>
      <div class="mycreation"
           v-if="this.detail.userPoint.userId != undefined">
        <h4>我创建的歌单（{{ detail.profile.playlistCount }}）</h4>
        <song-sheet v-for="item in myCreationList.playlist"
                    :key="item.id"
                    :data="item"></song-sheet>
      </div>
    </div>
  </div>
</template>

<script>
import cityJson from '../../assets/city.json';
import axios from 'axios';
import UserSongsheet from '../../components/user/UserSongsheet.vue';
import SongSheet from '../../components/songsheet/SongSheet.vue';
export default {
   name: 'Detail',
   components: {
      UserSongsheet,
      SongSheet,
   },
   props: {},
   data() {
      return {
         detail: {},
         msg: {},
         myCreationList: {},
      };
   },
   computed: {},
   watch: {},
   methods: {
      getProvince(val) {
         return this.msg['0'][val];
      },
      getCity(val) {
         let province = Math.floor(val / 10000) + '0000';
         return this.msg[`0,${province}`][val];
      },
      getMyCreation(id) {
         axios({
            url: `http://localhost:3000/user/playlist?uid=${id}`,
            withCredentials: true,
         })
            .then(res => {
               this.myCreationList = res.data;
            })
            .catch(e => {});
      },
      send() {
         this.$bus.emit('getMsg', this.detail);
         this.$router.push('/userupdate');
      },
   },
   created() {
      this.$bus.on('getUserDetail', res => {
         this.detail = res;
         this.getMyCreation(this.detail.userPoint.userId);
      });
   },
   mounted() {
      this.msg = cityJson;
   },
};
</script>

<style scoped>
.userdetail {
   padding: 80px 0px;
}
.user {
   display: flex;
   justify-content: center;
   align-self: center;
   width: 1200px;
   background: rgb(43, 43, 43);
   color: rgb(208, 208, 208);
   margin: 0 auto;
   padding: 10px;
   border-radius: 40px;
}
.left {
   width: 20%;
}
.left > img {
   width: 100%;
   border-radius: 50%;
   box-shadow: 0px 0px 4px red;
}
.msg {
   text-align: left;
   display: flex;
   justify-content: space-between;
   width: 100%;
}
.msg > div > span {
   display: inline-block;
   padding: 1px 6px;
   border-radius: 2em;
   background: rgb(208, 208, 208);
   color: rgb(43, 43, 43);
   font-size: 12px;
}
.msg > div > a {
   text-align: center;
   display: inline-block;
   width: 130px;
   border: 1px solid rgb(208, 208, 208);
   border-radius: 2em;
   padding: 5px 10px;
   color: rgb(208, 208, 208);
   text-decoration: none;
}
.msg > div > a:hover {
   text-decoration: underline;
}
.right {
   width: 60%;
   display: flex;
   justify-content: space-evenly;
   flex-direction: column;
   align-items: start;
   padding-left: 30px;
}
.top {
   display: flex;
   justify-content: space-around;
   align-items: center;
   transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.top > span {
   display: inline-block;
   transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
   padding: 10px 0px;
   width: 63px;
   border-radius: 5px;
}
.top > span:hover {
   background: rgba(96, 96, 96, 0.3);
}
.top > span:active {
   background: rgba(96, 96, 96, 0.5);
}
h4 {
   text-align: left;
}
.sheet > div {
   width: 15%;
   padding: 10px;
}
.sheet {
   display: flex;
   justify-content: start;
   align-items: center;
   flex-wrap: wrap;
}
.mycreation {
   max-width: 1200px;
   margin: 0 auto;
   text-align: left;
}
.mycreation > div {
   display: inline-block;
   padding: 5px 10px;
   box-sizing: border-box;
   width: 20%;
   text-align: center;
}
</style>
