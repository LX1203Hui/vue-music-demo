<!--  -->
<template>
  <div>
    <div id="login"
         @click="emitData()"
         @mouseup="this.show=true"
         v-if="this.$cookies.isKey('__csrf') && this.msg.account!=undefined">
      <img @click.capture.stop="userRoute(),emitData()"
           :src="`${this.msg.profile.avatarUrl}?param=50y50`"
           alt="">
      <span>{{this.msg.profile.nickname}}</span>
      <span>
        <img v-if="this.vip.message=='成功'"
             :src="this.vip.data.redVipDynamicIconUrl || this.vip.data.redVipLevelIcon"
             alt="">
      </span>
      <a><i class="fas fa-caret-down"></i></a>
    </div>
    <div id="drop-down"
         @mouseleave="this.show=false"
         v-if="this.show">
      <user-option :usrmsg="cloneDeep()"
                   :vip="this.vip"></user-option>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';
import UserOption from './UserOption.vue';
export default {
   name: 'ElUser',
   components: {
      UserOption: UserOption,
   },
   props: {},
   data() {
      return {
         msg: {},
         vip: {},
         show: false,
      };
   },
   computed: {},
   watch: {},
   methods: {
      message() {
         axios({
            url: 'http://localhost:3000/user/account',
            params: {
               timestamp: Date.now(),
            },
            withCredentials: true,
         })
            .then(res => {
               this.msg = JSON.parse(JSON.stringify(res.data));
            })
            .catch(err => {
               //未登录
            });
      },
      cloneDeep() {
         return _.cloneDeep(this.msg);
      },
      userRoute() {
         this.$router.push('/userdetail');
      },
      getvip() {
         //
         axios({
            url: 'http://localhost:3000/vip/info',
            params: {
               timestamp: Date.now(),
            },
            withCredentials: true,
         })
            .then(res => {
               this.vip = res.data;
            })
            .catch(err => {
               //未登录
            });
      },
      async getDetail(id) {
         let res = await axios({
            url: `http://localhost:3000/user/detail`,
            params: {
               uid: id,
               timestamp: Date.now(),
            },
            withCredentials: true,
         });
         return res.data;
      },
      async emitData() {
         let res = await this.getDetail(this.msg.account.id);
         this.$bus.emit('getUserDetail', res);
      },
   },
   created() {
      this.message();
      this.getvip();
   },
   mounted() {},
};
</script>

<style scoped>
#login span img {
   width: 50px;
}
#login span {
   text-decoration: underline;
   font-weight: bold;
}
#login * {
   vertical-align: middle;
   margin: 0px 3px;
}
#login a {
   background: var(--Ga7);
   display: inline-block;
   padding: 4px 5px;
   border-radius: 1em;
   color: #fff;
   font-size: 12px;
}
#login > img {
   border-radius: 50%;
   box-shadow: 0px 0px 4px red;
   transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
#login > img:hover {
   transform: scale(1.1);
}
/* #drop-down{
    transform: ;
} */
</style>
