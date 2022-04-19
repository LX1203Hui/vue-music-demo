<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import MusicPlayer from './components/player/MusicPlayer.vue';
import LoginBtn from './views/login/loginComp/LoginBtn.vue';
import LoginVeiw from './views/login/LoginVeiw.vue';
import MusicNav from './views/nav/MusicNav.vue';
import { ref, computed, watch } from 'vue';
import { useCookies } from 'vue3-cookies';
import { useStore } from 'vuex';
let store = useStore();
const { cookies } = useCookies();
let like = ref(false);
let playerShow = ref(false);
const updataLike = val => {
   like.value = !like.value;
};
const isSucc = computed(() => {
   return cookies.isKey('__csrf');
});
</script>

<template>
  <div>

    <div id="nav"
         class="border border-rd-bottom">
      <div class="logo">
        <img src="./assets/images/logo1.jpg">
      </div>
      <search-nav></search-nav>
      <div class="login"
           v-if="!isSucc">
        <login-btn></login-btn>
      </div>
      <div v-if="isSucc"
           class="succ-login">
        <el-user class="log">
        </el-user>
      </div>
    </div>
    <music-nav></music-nav>
    <music-player :like="like"
                  @updataLike="updataLike()"
                  @mouseleave="playerShow=!playerShow"
                  :class="(store.state.isPlayerLock)?'music-player-content-show':(playerShow?'playershow':'playerhide')">
    </music-player>
    <div class="playershowDiv"
         @mouseover="playerShow=!playerShow">

    </div>
    <router-view />
    <login-veiw></login-veiw>
  </div>
</template>

<style>
@import 'https://lib.baomitu.com/font-awesome/5.15.4/css/all.css';
/* npm uninstall @fortawesome/fontawesome-free */
@import './assets/css/musicstyle.css';
@import './assets/css/home.css';
a {
   color: var(--color-text);
}
div#app > div {
   margin: 50px 0px;
}
#nav {
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   background: white;
   position: fixed;
   z-index: 999;
   top: 0;
   left: 0;
   right: 0;
   bottom: auto;
   padding: 25px;
}
.login {
   position: absolute;
   right: 1%;
}
.logo {
   position: absolute;
   width: 100px;
   overflow: hidden;
   left: 5%;
}
.logo > img {
   width: 100%;
   border-radius: 15px;
}
.succ-login {
   position: absolute;
   right: 1%;
}
</style>
