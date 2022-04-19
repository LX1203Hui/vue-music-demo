<!--  -->
<template>
  <div>
      <!-- {{songmsg.trackCount}}
      {{songmsg.coverImgUrl}}
      {{songmsg.playCount}}
      {{songmsg.name}}
      {{songmsg.id}} -->
      <div class="container">
          <div class="content">
              <div>
                  <div>
                      <img :src="`${songmsg.coverImgUrl}?param=200y200`" alt="">
                      <span>{{songmsg.playCount}}</span>
                  </div>
              </div>
              <div>
                  <h4>{{songmsg.name}}</h4>
                  <span>{{songmsg.trackCount}}</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'UserSongsheet',
  components: {},
  props: {
      songmsg:Object
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>

<style scoped>
.content > div {
}
.content > div > div{
    position: relative;
    width: 200px;
    height: 200px;
}
.content > div > div > span,img{
    position: absolute;
    left: 0;
}
.content > div > div > span{
    right: 0;
}
</style>
