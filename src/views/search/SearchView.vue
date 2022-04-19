<template>
  <div class="search-view">
    <h1>
      <font-awesome-icon icon="search" />搜索结果
    </h1>
    <div class="search-child">
      <router-link :to="{path:'/search',query:{keywords:$route.query.keywords}}"
                   :class="{'search-child-active ':$route.path=='/search'}">单曲</router-link>
      <router-link :to="{path:'/search/artists',query:{keywords:$route.query.keywords}}"
                   :class="{'search-child-active ':$route.path=='/search/artists'}">歌手</router-link>
      <router-link :to="{path:'/search/playlists',query:{keywords:$route.query.keywords}}"
                   :class="{'search-child-active ':$route.path=='/search/playlists'}">歌单</router-link>
    </div>
    <router-view></router-view>

  </div>
</template>

<script setup>
</script>

<style scoped>
.search-view {
   padding: 100px;
   text-align: left;
}

.search-child {
   margin: 10px;
}
.search-child a {
   padding: 5px 10px;
   font-size: 22px;
   box-sizing: border-box;
}
.search-child-active {
   border-bottom: 3px solid red;
}
</style>
