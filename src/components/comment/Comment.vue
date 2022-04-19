<!--  -->
<template>
  <div>
    <div class="comment">
      <h4>{{type}}{{(total)?`(${total})`:''}}</h4>
      <ul v-if="comments.length>0">
        <li v-for="item in comments"
            :key="item.id"
            class="border">
          <div class="msg">
            <div class="img">
              <img :src="`${item.user.avatarUrl}?param=40y40`"
                   alt="">
            </div>
            <div class="msg-user">
              <p><a @click.prevent="user(item.user.userId)">{{item.user.nickname}}</a>:<span>{{item.content}}</span></p>
              <p class="time">{{(hasChinese(item.timeStr))?item.timeStr:time(item.time)}}</p>
            </div>
            <div class="liked">
              <span><i class="far fa-thumbs-up"></i>{{item.likedCount}}</span>
            </div>
          </div>
        </li>
      </ul>
      <ul v-else>
        <li>还没有评论，快来抢沙发吧!</li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
   name: 'Comment',
   components: {},
   props: {
      comments: {
         type: Array,
         default: [
            {
               user: {
                  locationInfo: null,
                  liveInfo: null,
                  anonym: 0,
                  commonIdentity: null,
                  userId: 6336796986,
                  avatarDetail: null,
                  userType: 0,
                  followed: false,
                  mutual: false,
                  remarkName: null,
                  vipRights: null,
                  nickname: '偷吃月亮_io5H',
                  avatarUrl:
                     'https://p3.music.126.net/u1ro2S2_Lt9T30SUX1Ou2Q==/109951166684260000.jpg',
                  authStatus: 0,
                  expertTags: null,
                  experts: null,
                  vipType: 0,
               },
               beReplied: [],
               pendantData: null,
               showFloorComment: null,
               status: 0,
               commentId: 5472578679,
               content: '我们都不是好演员，你演不出喜欢，我藏不住热情',
               contentResource: null,
               time: 1638500322780,
               timeStr: '12-03',
               needDisplayTime: true,
               likedCount: 5,
               expressionUrl: null,
               commentLocationType: 0,
               parentCommentId: 0,
               decoration: {},
               repliedMark: null,
               liked: false,
            },
         ],
      },
      total: Number,
      type: String,
   },
   data() {
      return {};
   },
   computed: {},
   watch: {},
   methods: {
      hasChinese(timeStr) {
         let reg = new RegExp(/[\u4e00-\u9fa5]/g);
         return reg.test(timeStr);
      },
      time(time) {
         return moment(time).format('YYYY年MM月DD日 hh:mm');
      },
   },
   created() {},
   mounted() {},
};
</script>

<style scoped>
h4 {
   text-align: left;
   margin-bottom: 20px;
}
ul {
   text-align: left;
   list-style: none;
}
li {
   margin-bottom: 3px;
   transform-origin: 50% 100%;
}
a {
   color: indigo;
   font-size: 14px;
}
a + span {
   font-size: 12px;
}
a:hover {
   text-decoration: underline;
}
.comment {
   margin: 0 auto;
   width: 80vw;
}
img {
   border-radius: 50%;
}
.msg {
   display: flex;
   justify-content: left;
   align-items: flex-start;
   position: relative;
}
.msg .liked {
   position: absolute;
   right: 0;
   bottom: 0;
}
.border {
   background: #e8e8e8;
   border: 1px solid #e8e8e8;
   border-radius: 5px;
   transition: all 0.3s;
   box-shadow: 3px 3px 6px #c5c5c5, -3px -3px 6px #ffffff;
   padding: 20px;
}
li:hover {
   background: #e0e0e0;
   transform: scaleY(1.1);
}
.time {
   color: rga(159, 159, 159);
   font-size: 12px;
}
.img {
   width: 40px;
   height: 40px;
   margin-right: 10px;
}
</style>
