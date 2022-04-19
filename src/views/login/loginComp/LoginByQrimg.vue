<template>
  <div class="container">
    <div class="content">
      <div :class="this.cls">
        <img ref="qrImg"
             :src="qrImg"
             alt="">
      </div>
      <div>
        <i v-if="this.code==803"
           id="wc"
           class="fa fa-check-circle"
           aria-hidden="true"></i>
        <i v-if="this.code==802"
           id="zz"
           class="fa fa-info-circle"
           aria-hidden="true"></i>
        <i v-if="this.code==800"
           id="cw"
           class="fa fa-times-circle"
           aria-hidden="true"></i>
        <span>{{this.message}}</span>
      </div>
    </div>
    <div class="tips-img"
         @mouseenter.capture="changeImgMove"
         @mouseout.capture="changeImg()">
      <img ref="tipsImg"
           src="../../../assets/images/qr_guide.png"
           alt="">
    </div>
    <div class="about-qring">
      <p @click="refresh">刷新<i class="fa fa-sync-alt"
           aria-hidden="true"></i></p>
      <p v-if="this.code==801">{{this.wait}}</p>
      <button @click="changeType1">其他登录方式</button>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
export default {
   name: 'LoginByQrimg',
   components: {},
   props: {},
   data() {
      return {
         code: 0,
         timer: '',
         qrImg: '',
         message: '',
         cls: '',
         wait: '',
      };
   },
   computed: {},
   watch: {},
   methods: {
      changeImgMove() {
         this.$refs.qrImg.style = 'transform: translateX(50%);';
         this.$refs.tipsImg.style = 'transform: translateX(-50%);';
      },
      changeImg() {
         this.$refs.qrImg.style = 'transform: translateX(0%);';
         this.$refs.tipsImg.style = 'transform: translateX(0%);';
      },
      changeType1() {
         this.$bus.emit('changeType');
      },
      //获取二维码当前状态
      async checkStatus(key, time) {
         const res = await axios({
            url: `http://localhost:3000/login/qr/check?key=${key}&timerstamp=${time}`,
            withCredentials: true,
         });
         return res.data;
      },
      //获取当前用户状态
      async getLoginStatus(time) {
         const res = await axios({
            url: `http://localhost:3000/login/status?timerstamp=${time}`,
            withCredentials: true,
         });
      },
      //获取二维码key
      async getkey(time) {
         const res = await axios({
            url: `http://localhost:3000/login/qr/key?timestamp=${time}`,
            withCredentials: true,
         });
         return res.data.data.unikey;
      },
      //获取二维码图片
      async getQrImg(key, time) {
         const res = await axios({
            url: `http://localhost:3000/login/qr/create?key=${key}&qrimg=true&timestamp=${time}`,
            withCredentials: true,
         });
         return res.data.data.qrimg;
      },
      //登录以及检查
      async login() {
         let timerstamp = Date.now();

         const key = await this.getkey(timerstamp);

         this.qrImg = await this.getQrImg(key, timerstamp);

         this.timer = setInterval(async () => {
            const statusRes = await this.checkStatus(key, Date.now());
            if (statusRes.code === 800) {
               this.code = 800;
               this.cls = 'change';
               this.message = statusRes.message;
               clearInterval(this.timer);
            }
            if (statusRes.code === 801) {
               this.code = 801;
               this.wait = statusRes.message;
               this.cls = '';
            }
            if (statusRes.code === 802) {
               this.code = 802;
               this.cls = 'change';
               this.message = statusRes.message;
            }
            if (statusRes.code === 803) {
               this.code = 803;
               this.cls = 'change';
               this.message = statusRes.message;
               clearInterval(this.timer);
               setTimeout(() => {
                  this.$bus.emit('isSucc', '登录成功');
               }, 500);
            }
         }, 1000);
      },
      //刷新
      async refresh() {
         window.clearInterval(this.timer);
         this.login();
      },
   },
   created() {
      this.login();
   },
   mounted() {},
   unmounted() {
      clearInterval(this.timer);
   },
};
</script>


<style scoped>
.container {
   position: relative;
   width: 100%;
   height: 100%;
}
.tips-img {
   position: absolute;
   top: 10%;
   left: 0;
   right: 0;
   bottom: 0;
   margin: auto;
}
.content > div:first-child > img {
   width: 35%;
   margin-top: 30%;

   transition: all 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
.tips-img > img {
   width: 32%;
   transition: all 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
.content {
   width: 80%;
   height: 100%;
   margin: 0 auto;
}
.about-qring {
   position: absolute;
   bottom: -30%;
   left: 0;
   right: 0;
   margin: auto;
}
/*


.content3 {
   position: absolute;
   margin: 0 auto;
   width: 200px;
   height: 200px;
}
.content3 > div {
   position: absolute;
   border: 1px solid black;
   width: 200px;
   height: 200px;
   top: 0;
   left: 0;
   display: flex;
   justify-content: center;
   align-items: center;
}
.change {
   opacity: 0.5;
   filter: blur(1px);
}
span {
   font-weight: bold;
   color: #000;
}
#wc {
   color: green;
}
#cw {
   color: red;
} */
</style>
