<!--  -->
<template>
  <div class="nav-content border">
    <div>
      <router-link to="/"
                   :class="{'nav-active':$route.path==null || $route.path=='/'}">
        <font-awesome-icon icon="house" />
        <span>首页</span>
      </router-link>
    </div>
    <div>
      <router-link to="/fm"
                   :class="{'nav-active':$route.path=='/fm'}">
        <font-awesome-icon icon="headphones" />
        <span>私人FM</span>
      </router-link>
    </div>
    <div>
      <router-link to="/toplist"
                   :class="{'nav-active':$route.path=='/toplist'}">
        <font-awesome-icon icon="square-poll-vertical" />
        <span>排行榜</span>
      </router-link>
    </div>
    <div>
      <router-link to="/artist"
                   :class="{'nav-active':$route.path=='/artist' || $route.path=='/artist/detail'}">
        <font-awesome-icon icon="users" />
        <span>歌手</span>
      </router-link>
    </div>
    <div>
      <router-link to="/playlist"
                   :class="{'nav-active':$route.path=='/playlist'}">
        <font-awesome-icon icon="list-ul" />
        <span>歌单</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style>
.nav-content {
   position: fixed;
   left: 0;
   top: 0;
   margin: auto;
   height: 50vh;
   right: auto;
   bottom: 0;
   background: white;
   overflow: hidden;
   border-radius: 0px 100% 100% 0px /0px 10% 10% 0px;
   z-index: 999;
   padding: 2% 10px;
}
.nav-content > div {
   width: 100%;
   height: 20%;
   display: flex;
   justify-content: center;
   align-items: center;
}
.nav-content > div > a {
   box-sizing: border-box;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   width: 100%;
   padding: 20% 0;
   border-radius: 20%;
   transition: all 500ms cubic-bezier(0.23, 1, 0.32, 1);
}
.nav-content > div > a:hover {
   background: white;
}
.nav-active {
   border-bottom: 3px solid #333;
   color: var(--lightcolor1);
   transform: scale(1.1);
   background: white;
}
</style>
