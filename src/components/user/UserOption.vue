<!--  -->
<template>
  <div>
    <div class="container border">
      <div class="content">
        <div class="top">
          <span>
            <!-- "followeds": 1,
                        "follows": 1,
                        "eventCount": 0, 
                        {{this.thisData.profile.accountStatus}}
                        -->

            <!-- {{thisData.profile.accountStatus}} -->
            <h3>{{ thisData && thisData.profile && thisData.profile.eventCount}}</h3>
            <span>动态</span>
          </span>
          <span>
            <h3>{{ thisData && thisData.profile && thisData.profile.follows}}</h3>
            <span>关注</span>
          </span>
          <span>
            <h3>{{ thisData && thisData.profile && thisData.profile.followeds}}</h3>
            <span>粉丝</span>
          </span>
        </div>
        <div class="bottom">
          <ul>
            <li><span><i></i>我的会员</span><span>{{ this.vip.data.associator && getTime(this.vip.data.associator.expireTime) || '前往开通会员'}}</span></li>
            <li><span><i></i>我的等级</span><span>lv:{{this.thisData.level}}</span></li>
            <li @click="$router.push('/userupdate')"><span><i></i>个人信息设置</span><span></span></li>
            <li @click="loginout()"><span><i></i>退出登录</span><span></span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
export default {
   name: 'UserOption',
   components: {},
   props: {
      usrmsg: Object,
      vip: Object,
   },
   data() {
      return {
         thisData: {},
      };
   },
   computed: {},
   watch: {},
   methods: {
      cl() {},
      loginout() {
         axios({
            url: 'http://localhost:3000/logout',
            params: {
               timestamp: Date.now(),
            },
            withCredentials: true,
         }).then(res => {
            this.thisData = {};
            location.reload();
         });
      },
      getTime(time) {
         return moment(time).format('YYYY-MM-DD') + '过期';
      },
   },
   created() {},
   mounted() {
      this.$bus.on('getUserDetail', res => {
         this.thisData = _.cloneDeep(res);
      });
   },
};
</script>

<style scoped>
.container {
   background: var(--bg);
   padding: 0px 7px;
   position: absolute;
   width: 200px;
   border-radius: 12px;
   border: 3px solid white;
   top: 73px;
}
ul {
   list-style: none;
}
.top {
   display: flex;
   justify-content: space-around;
   align-items: center;
}
.top > span {
   display: inline-block;
   transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
   padding: 10px 0px;
   width: 33.3%;
   border-radius: 5px;
}
.top > span:hover {
   background: var(--rd);
}
.top > span:active {
   background: var(--rd);
}
.content > div {
   padding: 8px 0px;
}
.content > li {
   padding: 8px;
   display: flex;
   justify-content: space-between;
   transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
   border-radius: 5px;
}
li:hover {
   background: var(--rd);
}
li > span:nth-of-type(2) {
   font-size: 13px;
   font-size: #aaa;
   line-height: 21px;
   text-align: right;
}
</style>
