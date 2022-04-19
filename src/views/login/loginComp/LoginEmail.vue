<!--  -->
<template>
  <div class="ps-content">
    <div class="ps">
      <div>
        <span>邮箱登录</span>
        <input placeholder="邮箱地址"
               type="text"
               v-model="email">
        <p style="position: absolute;right: 25%;">@163.com</p>
      </div>
      <div>
        <span>密码</span>
        <input placeholder="密码"
               type="password"
               v-model="password">
      </div>
    </div>
    <div class="bottom">
      <div><input type="checkbox"
               id="check"
               v-model="isCheck">
        <label for="check">记住我？</label>
      </div>
      <login-btn :data="{curType,email,password,isCheck}"></login-btn>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import md5 from 'js-md5';
import LoginBtn from '../loginComp/LoginBtn.vue';
export default {
   name: 'LoginPass',
   components: {
      LoginBtn,
   },
   props: {
      curType: {
         type: Number,
         default: null,
      },
   },
   data() {
      return {
         email: this.$cookies.get('email'),
         password: this.$cookies.get('password'),
         isCheck: false,
      };
   },
   computed: {},
   watch: {},
   methods: {
      login() {
         if (!this.phone || !this.password) {
            const msg = '请设置你的手机号码和密码';
            alert(msg);
            throw new Error(msg);
         } else {
            //为了解决特殊字符问题，比如#
            let ps = md5(encodeURIComponent(this.password));
            axios({
               //未知的手机号http返回state：200,但是服务器返回400
               //502：密码错误
               url: `http://localhost:3000/login/cellphone`,
               params: {
                  phone: this.phone,
                  md5_password: ps,
                  timestamp: Date.now(),
               },
               withCredentials: true, //关键
            }).then(res => {
               if (res.data.code == '200') {
                  //保存 pass 和 phone 到cookie
                  if (this.isCheck) {
                     this.$cookies.set('phone', this.phone);
                     this.$cookies.set('password', this.password);
                  }
                  this.$router.push('/');
               } else if (res.data.code == '400') {
                  this.err = '未知手机号';
               } else if (res.data.code == '502') {
                  this.err = '查看你的手机号和密码是否输入正确';
               }
            });
         }
      },
   },
   created() {},
   mounted() {},
};
</script>

<style scoped>
.ps-content {
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-content: center;
   justify-content: center;
}
.ps {
   width: 80%;
   height: 50%;
   margin: 0 auto;
   margin-top: -20%;
}
.ps > div {
   display: flex;
   height: 60%;
   justify-content: center;
   align-items: center;
}
.ps > div > span {
   display: inline-block;
   font-weight: bold;
   width: 20%;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
}
.ps > div > input {
   flex: 1;
   height: 50%;
   padding: 10px;
   box-sizing: border-box;
   font-size: 20px;
   font-weight: bold;
   border-radius: 3px;
   transition: all 200ms linear;
}
.ps > div > input:focus {
   border: 5px solid #e0e0e0;
}
.ps > div > input::-webkit-input-placeholder {
   font-size: 14px;
   color: var(--Ga4_t);
}
.bottom {
   position: absolute;
   left: 50%;
   bottom: 10%;
   margin-left: -8.5%;
   display: flex;
   flex-direction: column;
   justify-content: center;
}
</style>
