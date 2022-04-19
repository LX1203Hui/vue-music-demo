<script setup>
import { getCurrentInstance, defineProps } from 'vue';
import axios from 'axios';
import md5 from 'js-md5';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();

const bus = getCurrentInstance().appContext.app.config.globalProperties.$bus;
const loginShow = () => {
   if (props.data == undefined || null) {
      bus.emit('foo');
   } else if (props.data.curType == 1) {
      //手机登录
      loginBypasswd(props.data);
   } else if (props.data.curType == 2) {
      //验证码登录
      LoginByCheckcode(props.data);
   } else if (props.data.curType == 3) {
      //邮箱登录
      LoginByEmail(props.data);
   }
};

const loginBypasswd = data => {
   if (!data.phone || !data.password) {
      const msg = '请设置你的手机号码和密码';
      alert(msg);
      throw new Error(msg);
   } else {
      //为了解决特殊字符问题，比如#
      let ps = md5(encodeURIComponent(data.password));
      axios({
         //未知的手机号http返回state：200,但是服务器返回400
         //502：密码错误
         url: `http://localhost:3000/login/cellphone`,
         params: {
            phone: data.phone,
            md5_password: ps,
            timestamp: Date.now(),
         },
         withCredentials: true, //关键
      }).then(res => {
         if (res.data.code == '200') {
            //保存 pass 和 phone 到cookie
            if (data.isCheck) {
               cookies.set('phone', data.phone);
               cookies.set('password', data.password);
            }
            console.log(res.data);
            localStorage.setItem('__userdata', JSON.stringify(res.data));
            bus.emit('isSucc', '登录成功');
         } else if (res.data.code == '400') {
            bus.emit('errPw', '未知手机号');
         } else if (res.data.code == '502') {
            bus.emit('errPw', '查看你的手机号和密码是否输入正确');
         }
      });
   }
};

const LoginByCheckcode = data => {
   axios({
      url: `http://localhost:3000/captcha/verify?phone=${data.phone}&captcha=${data.checkCodeVal}`,
      withCredentials: true,
   })
      .then(res => {
         if (res.data.code >= 200 && res.data.code < 300) {
            localStorage.setItem('__userdata', JSON.stringify(res.data));
            bus.emit('isSucc', '登录成功');
         } else {
            bus.emit('errPw', res.data.message);
         }
      })
      .catch(err => {
         console.log(err);
      });
};

const LoginByEmail = data => {
   if (!data.email || !data.password) {
      const msg = '请设置你的邮箱和密码';
      alert(msg);
      throw new Error(msg);
   } else {
      //为了解决特殊字符问题，比如#
      let ps = md5(encodeURIComponent(data.password));
      axios({
         //未知的手机号http返回state：200,但是服务器返回400
         //502：密码错误
         url: `http://localhost:3000/login`,
         params: {
            email: data.email + '@163.com',
            md5_password: ps,
            timestamp: Date.now(),
         },
         withCredentials: true, //关键
      }).then(res => {
         if (res.data.code >= 200 && res.data.code < 300) {
            //保存 pass 和 phone 到cookie
            if (data.isCheck) {
               cookies.set('email', data.email);
               cookies.set('password_e', data.password);
            }
            bus.emit('isSucc', '登录成功');
         } else {
            alert(res.data.message);
         }
      });
   }
};
const props = defineProps({
   data: {
      type: Object,
      default: null,
   },
});
</script>


<template>
  <div class="login-content">
    <button class="login-btn"
            @click="loginShow">登录</button>
    <div class="login-bg">
    </div>
  </div>
</template>



<style>
.login-content {
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
}
.login-content:hover .login-bg {
   border: 3px solid var(--Ga3_t);
}
.login-content:active .login-btn {
   background: var(--Ga2_t);
}
.login-bg {
   position: absolute;
   width: 100px;
   height: 30px;
   border-radius: 10px;
   background: var(--Ga3_t);
   border: 0px solid var(--Ga3_t);
   transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
}
.login-btn {
   z-index: 4;
   width: 100px;
   height: 30px;
   box-sizing: border-box;
   border: 2px solid #000;
   border-radius: 10px;
   text-align: center;
   background: white;
   transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
}
</style>