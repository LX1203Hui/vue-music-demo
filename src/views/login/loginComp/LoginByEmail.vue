<!--  -->
<template>
  <div>
      <div style="width: 222px;margin:0 auto ">
        <p style="position: relative; ">邮箱：<input type="text" v-model="email"><span style="position: absolute;right: 0;top: 3px; ">@163.com</span></p>
        <p>密码：<input type="text" v-model="password"></p>
        <p><input type="checkbox" id="check1" v-model="isCheck"><label for="check1">记住我？</label></p>
        <button @click="login">登录</button>
        <p>{{this.err}}</p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'js-md5'
export default {
  name: 'LoginByEmail',
  components: {},
  props: {},
  data() {
    return {
        email: this.$cookies.get('email'),
        password: this.$cookies.get('password_e'),
        isCheck:false,
        err:''
    }
  },
  computed: {},
  watch: {},
  methods: {
      ///login?email=xxx@163.com&password=yyy
      login() {
            if (!this.email || !this.password) {
                const msg = '请设置你的邮箱和密码'
                alert(msg)
                throw new Error(msg)
            }else{
                //为了解决特殊字符问题，比如#
                let ps=md5(encodeURIComponent(this.password));
                axios({

                    //未知的手机号http返回state：200,但是服务器返回400
                    //502：密码错误
                    url: `http://localhost:3000/login`,
                    params:{
                        email:this.email+'@163.com',
                        md5_password:ps,
                        timestamp:Date.now(),
                    },
                    withCredentials: true, //关键
                }).then( res => {
                    console.log(res.data)
                    if(res.data.code=="200"){

                        //保存 pass 和 phone 到cookie
                        if(this.isCheck){
                            this.$cookies.set('email',this.email)
                            this.$cookies.set('password_e',this.password)
                        }
                        // this.$cookies.remove('__remember_me')
                        // this.$store.commit('getUserData',res.data)
                        this.$router.push('/')
                    }else if(res.data.code=='400'){
                        this.err='未知邮箱'
                    }else if(res.data.code=='502'){
                        this.err='查看你的邮箱和密码是否输入正确'
                    }
                    this.err=res.data.message
                })
                    
            }
          
        }
  },
  created() {},
  mounted() {}
}
</script>

<style scoped>
</style>