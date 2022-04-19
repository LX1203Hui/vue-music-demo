<!--  -->
<template>
  <div>
      <div v-if="id!=undefined" class="container1" @click="levse(id)">
        <div class="content">
            <div class="top-songer">
                <img :src="`${img1v1Url}?param=180y180`" alt="">
                <div>
                    <span>
                        <p>{{musicSize}}</p>
                        <p>歌曲</p>
                    </span> 
                    <span>
                        <p>{{albumSize}}</p>
                        <p>专辑</p>
                    </span>
                </div>
            </div>
        </div>
        <h3>{{name}}</h3>
      </div>
  </div>
</template>

<script>
import { numtostr } from '../../../utils/numberToStr'
export default {
  name: 'Songer',
  components: {},
  props: {
    songer:Object
  },
  data() {
    return {}
  },
  computed: {
  },
  watch: {},
  methods: {
    levse(id){
        this.$router.push({name:`detail`,query:{id:id}})
    }
  },
  created() {},
  mounted() {},
  setup(props){
    return {
      id:props.songer.id,
      name:props.songer.name,
      albumSize:props.songer.albumSize,
      img1v1Url:props.songer.img1v1Url,
      musicSize:props.songer.musicSize,
    }
  },
  beforeRouteLeave(to,from,next){
      console.log('to',to)
      console.log('from',from)
      next(vm =>{
          console.log(vm)
      })
  }
}
</script>

<style scoped>
.content{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.content *{
    border-radius: 5px;
}
.top-songer{
  position: relative;
  overflow: hidden;
  background-color: #333;
  height: 182px;
  width: 180px;
}

.top-songer > div {
  position: absolute;
  left: auto;
  right: 0;
  top: 0;
  bottom: 0;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: row;
  width: 100%;
}
.top-songer > div >span{
  display: inline-block;
  width: 3em;
  height: 3em;
  margin: 3px;
  opacity: 0;
}

.top-songer > div >span >p{
  font-size: 0.2em;

}
.top-songer > div >span >p:nth-child(1){
  font-weight: bold;
}
.top-songer > div >span >p:nth-child(2){
  background: rgb(220,221,222);
}
.top-songer > div >span:nth-child(2n){
  background-color: rgba(246,246,246,1);
}
.top-songer > div >span:nth-child(2n-1){
  background-color: rgba(255,255,255,1);
}
.container1{
  text-align: center;  
}
img{
  transition:all 300ms cubic-bezier(0.19, 1, 0.22, 1);
}
.container1:hover .content .top-songer > img { 
  filter: opacity(50%);
}

.container1:hover .content .top-songer div > span:nth-child(1){
  animation: span1 300ms;
  animation-fill-mode: forwards;
}
.container1:hover .content .top-songer div > span:nth-child(2){
  animation: span1 300ms 200ms;
  animation-fill-mode: forwards;
}
@keyframes span1 {
    0%{
        opacity: 0;
        transform: scaleX(0);
    }
    50%{
        opacity: 1;
        transform: scaleX(5px);
    }
    100%{
        opacity: 1;
        transform: scaleX(0px);
    }
}
p{
  line-height: 8em;
}
h3{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
