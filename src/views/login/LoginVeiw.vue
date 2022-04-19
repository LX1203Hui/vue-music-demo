

<script setup>
import { ref, getCurrentInstance } from 'vue';
import LoginByEmail from '../login/loginComp/LoginEmail.vue';
import LoginPass from '../login/loginComp/LoginPass.vue';
import LoginByQrimg from '../login/loginComp/LoginByQrimg.vue';
import LoginCheckcode from '../login/loginComp/LoginCheckcode.vue';
const bus = getCurrentInstance().appContext.app.config.globalProperties.$bus;
const isShow = ref(false);

//mitt
const xmark = () => {
   isShow.value = false;
   bus.emit('clearTime');
};
bus.on('foo', () => {
   isShow.value = true;
});
bus.on('changeType', () => {
   curType.value = 1;
});
bus.on('isSucc', e => {
   isShow.value = false;
   alert(e);
   location.reload();
});
const curType = ref(1);
const loginType = type => {
   //1:密码登录 2:手机验证码登录 3:邮箱登录 4:二维码登录
   curType.value = type;
};
</script>

<template>
  <div v-show="isShow"
       :class="{'login-container':true}"
       @click.stop="xmark">
    <div @click.stop=""
         class="login-frame border">
      <div class="login-xmark"
           @click="xmark">
        <font-awesome-icon icon="xmark" />
      </div>
      <div class="route-qrimg">
        <img @click="loginType(4)"
             src="../../assets/images/qrimg.png"
             alt="">
        <div class="qring-mask">
        </div>
      </div>
      <div class="login-subject">
        <h1>登录</h1>
        <div class="login-router"
             v-if="curType!=4">
          <a class="border"
             :class="{'login-active':curType==1}"
             @click="loginType(1)"
             :index="1">密码登录</a>
          <a class="border"
             @click="loginType(2)"
             :class="{'login-active':curType==2}">手机(验证码)登录</a>
          <a class="border"
             @click="loginType(3)"
             :class="{'login-active':curType==3}">邮箱登录</a>
        </div>
        <div class="login-input">
          <login-pass v-if="curType==1"
                      :curType="1"></login-pass>
          <login-checkcode v-if="curType==2"
                           :curType="2"></login-checkcode>
          <login-by-email v-if="curType==3"
                          :curType="3"></login-by-email>
          <login-by-qrimg v-if="curType==4"
                          :curType="4"></login-by-qrimg>
        </div>
      </div>
    </div>
  </div>
</template> 
<style scoped>
.login-show {
   display: none;
}
h1 {
   padding: 3%;
}
.login-container {
   position: fixed;
   top: 0;
   width: 100%;
   height: 100%;
   background: rgba(33, 33, 33, 0.7);
   z-index: 1000;
   display: flex;
   justify-content: center;
   align-items: center;
}
.login-container > .login-frame {
   position: relative;
   width: 90%;
   height: 50%;
   background: white;
   border-radius: 10px;
   max-width: 750px;
   overflow: hidden;
}
.login-container > .login-frame > .login-xmark {
   position: absolute;
   right: 0;
   top: 0px;
   text-align: right;
}
.login-container > .login-frame > .login-xmark:hover svg {
   transform: rotate(180deg);
   transition: all 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
}
.login-container > .login-frame > .login-xmark > svg {
   font-size: 2rem;
   padding: 10px;
}
.route-qrimg {
   width: 15%;
   position: absolute;
   top: 0;
   left: 0;
   overflow: hidden;
}
.route-qrimg > img {
   width: 100%;
   margin: 5px;
   transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1);
}
.route-qrimg > img:hover {
   transform: scale(1.1);
}
.route-qrimg > img:hover + .qring-mask {
   left: 10%;
}
.route-qrimg > .qring-mask {
   background: white;
   width: 150%;
   height: 100%;
   position: absolute;
   top: 25%;
   left: 5%;
   transform: rotate(-45deg);
   transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1);
}
.login-container > .login-frame > .login-subject {
   height: 100%;
}
.login-router > a {
   display: inline-block;
   box-sizing: border-box;
   padding: 10px 10px;
   width: 23%;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   border-radius: 5px;
}
.login-active {
   background: blueviolet;
   color: white;
}
.login-input {
   width: 69%;
   margin: 0 auto;
   height: 60%;
   display: flex;
   justify-content: center;
   align-items: center;
}
</style>
