<!--  -->
<template>
  <div class="userupdate">
    <div class="userupdate-content">
      <div class="userupdate-msg">
        <h1>编辑个人信息</h1>
        <div>
          <div>
            <div>昵称：<input type="text"
                     v-model="nickname"></div>
            <div class="introduce">
              <span>介绍：</span>
              <div><textarea class="border"
                          v-model="signature"
                          name=""
                          id=""
                          cols="30"
                          rows="10"></textarea>
                <span>{{introducelength-signature.length}}</span>
              </div>
            </div>
            <div class="gender">
              <input id="secrecy"
                     type="radio"
                     value="0"
                     v-model="gender"><label for="secrecy">保密</label>
              <input id="man"
                     type="radio"
                     value="1"
                     v-model="gender"><label for="man">男</label>
              <input id="woman"
                     type="radio"
                     value="2"
                     v-model="gender"><label for="woman">女</label>
            </div>
            <div>
              地区：
              <select name=""
                      id=""
                      v-model="province">
                <option v-for="(item,index) in cityJson[0]"
                        :value="index"
                        :key="item">{{item}}</option>
              </select>
              <select name=""
                      id=""
                      v-model="city">
                <option :value="index"
                        v-for="(item,index) in cityJson[`0,${province}`]"
                        :key="item">{{item}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="userupdate-img">
        <div>
          <div style="width: 50%;margin: 5px auto;border-radius: 20px;overflow: hidden;">
            <img :src="avatarUrl"
                 alt="">
          </div>
          <!-- <input type="file"
                 name="file"
                 id="filePicker" />
          <button @click="show()">修改图片</button> -->
        </div>
      </div>
    </div>

    <div class="operation-user">
      <div>
        <button @click="preserve()">保存</button>
        <button @click="back()">取消</button>
      </div>
    </div>
    <div>
      <!-- {{cityJson}} -->
    </div>
  </div>
</template>

<script>
import cityJson from '../../assets/city.json';
import { ref } from 'vue';
import axios from 'axios';
export default {
   name: 'UserUpdate',
   components: {},
   props: {},
   data() {
      return {
         nickname: '',
         birthday: ref(0),
         province: ref(0),
         city: ref(0),
         gender: ref('0'),
         signature: '',
         detail: {},
         introducelength: 300,
         userData: {},
         cityJson,
         avatarUrl: '',
      };
   },
   computed: {
      getProvince() {
         return this.cityJson['0'][this.province];
      },
      getCity() {
         return this.cityJson[`0,${this.province}`][this.city];
      },
   },
   watch: {
      province(newval) {
         let province1 = Math.floor(this.city / 10000) + '0000';
         if (province1 != newval) {
            this.city = Object.keys(this.cityJson[`0,${this.province}`])[0];
         }
      },
   },
   methods: {
      back() {
         this.$router.push('/');
      },
      async isRepeat(nickname) {
         let res = await axios({
            url: '/nickname/check',
            params: {
               nickname: this.nickname,
            },
         });
         return res.data;
      },
      preserve() {
         axios({
            url: '/user/update',
            params: {
               gender: this.gender,
               signature: this.signature,
               city: this.city,
               nickname: this.nickname,
               birthday: this.birthday,
               province: this.province,
            },
            withCredentials: true,
         })
            .then(res => {
               console.log(res.data);
            })
            .catch(err => {});
      },
      async state() {
         let res = await axios({
            url: 'http://localhost:3000/login/status',
            params: { timerstamp: Date.now() },
            withCredentials: true,
         });
         return res.data.data.profile;
      },
   },
   async created() {
      this.userData = await this.state();
      let { nickname, birthday, province, city, gender, signature, avatarUrl } =
         this.userData;

      this.nickname = nickname;
      this.birthday = birthday;
      this.province = province;
      this.city = city;
      this.gender = gender;
      this.signature = signature || '';
      this.avatarUrl = avatarUrl;
   },
   mounted() {},
};
</script>

<style scoped>
img {
   width: 100%;
}
.userupdate {
   padding: 100px 0px;
   width: 80vw;
   margin: 0 auto;
   text-align: left;
}
.userupdate > .userupdate-content {
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
}
.userupdate-img {
   width: 38%;
}
.userupdate-img > div {
   text-align: center;
}
.userupdate-msg {
   width: 60%;
}
.userupdate input {
   border-radius: 10px;
   height: 30px;
   border: 2px solid white;
   padding: 10px;
   box-sizing: border-box;
   outline-color: var(--Ga2_t);
   background: var(--bg);
}
.userupdate textarea {
   width: 100%;
   height: 180px;
   margin: 10px 0px;
   padding: 20px;
   font-family: initial;
   font-size: 16px;
   resize: none;
   background: rgb(240, 241, 242);
   outline: none;
   border-radius: 10px;
   border: 3px solid white;
   box-sizing: border-box;
}
.gender * {
   vertical-align: middle;
   padding: 10px;
}
button,
select {
   padding: 10px 20px;
   background: rgb(240, 241, 242);
   text-align: right;
   border: 2px solid white;
   border-radius: 1em;
   transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
   box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
}
button:hover {
   background: rgb(201, 201, 202);
   transform: scale(1.1);
}
button:active {
   background: rgb(181, 182, 183);
}
select,
option {
   text-align: center;
}
.introduce {
   display: flex;
   align-items: flex-start;
}
.introduce > div {
   width: 100%;
   position: relative;
}

.introduce > div > span {
   position: absolute;
   right: 0;
   bottom: 0;
   margin: 22px;
   font-weight: bold;
   color: var(--Ga3_t);
}
.introduce > span {
   white-space: nowrap;
}
.operation-user {
   margin: 10px;
   text-align: center;
}
</style>
