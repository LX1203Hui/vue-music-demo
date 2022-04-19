<!--  -->
<template>
  <div>
    <div class="container">
      <div class="content">
        <user-other @updateSonger="updateSongerList " :msg="this.classify"></user-other>
        <div class="border" style="padding: 30px;background: rgb(250,250,250);box-shadow:rgb(241,241,241) 3px 3px 6px, rgb(255,255,255) -3px -3px 6px;margin:10px">
          <div class="scroll"  @scroll="push($event)">
            <div class="songers">
              <template v-for="item in songerList" :key="item.id">
                <songer :songer="item" ></songer>
              </template>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
    
  </div>
</template>

<script>
import { _getSongerList } from '../../network/details'
import UserOther from '../../components/user/UserOther.vue'
import Songer from './childComps/Songer.vue'
export default {
  name: 'About',
  components: {
    UserOther,
    Songer
  },
  props: {},
  data() {
    return {
      classify:{
        language:[
          { val:-1 ,name:'全部'},
          { val:7  ,name:'华语'},
          { val:96 ,name:'欧美'},
          { val:8  ,name:'日本'},
          { val:16 ,name:'韩国'},
          { val:0  ,name:'其他'}
        ],
        type:[
          { val:-1  ,name:'全部'},
          { val:1  ,name:'男歌手'},
          { val:2  ,name:'女歌手'},
          { val:3  ,name:'乐队组合'},
        ],
        initial:[
          {val:-1,name:'热门'},
          {val:97,name:'A'},
          {val:98,name:'B'},
          {val:99,name:'C'},
          {val:100,name:'D'},
          {val:101,name:'E'},
          {val:102,name:'F'},
          {val:103,name:'G'},
          {val:104,name:'H'},
          {val:105,name:'I'},
          {val:106,name:'J'},
          {val:107,name:'K'},
          {val:108,name:'L'},
          {val:109,name:'M'},
          {val:110,name:'N'},
          {val:111,name:'O'},
          {val:112,name:'P'},
          {val:113,name:'Q'},
          {val:114,name:'R'},
          {val:115,name:'S'},
          {val:116,name:'T'},
          {val:117,name:'U'},
          {val:118,name:'V'},
          {val:119,name:'W'},
          {val:120,name:'X'},
          {val:121,name:'Y'},
          {val:122,name:'Z'},
          {val:0,name:'#'},
        ]
      },
      songerList:[],
      pageNext:true,
      thisUrlparam:'type=-1&area=-1&initial=-1',
      thisindex:-1,
      currPage:1
    }
  },
  computed: {},
  watch: {
    currPage(newval){
      if(newval == 1){
        this.songerList=[]
        this.setSongerListUrl(this.thisUrlparam)
      }else{
        this.setSongerListPage(newval)
      }
    },
    thisUrlparam(newval){
      if(this.currPage==1){
        this.songerList=[]
        this.setSongerListUrl(newval)
      }else{
        this.currPage=1
      }
    }
  },
  methods: {
    push(e){

      let offsetTop= e.target.firstChild.clientHeight
      let height =e.target.clientHeight+e.target.scrollTop

      if(offsetTop == height && this.pageNext==true){
        //触发
        this.currPage++;
      }else if(offsetTop == height && this.more==false){
        console.log('没有更多了！')
      }
    },
    updateSongerList(data){
      let { artists,more,param = 'type=-1&area=-1&initial=-1' } = data
      this.pageNext=more
      if(param == this.thisUrlparam){
        this.songerList.push(...artists)
      }
      5
      this.thisUrlparam=param
    },
    setSongerListPage(page){
       _getSongerList(this.thisUrlparam,page).then((result) => {
        result.data.param=this.thisUrlparam
        this.updateSongerList(result.data)
      }).catch((err) => {
        
      });
    },
    setSongerListUrl(url){
      _getSongerList(url).then((result) => {
        result.data.param=url
        this.updateSongerList(result.data)
      }).catch((err) => {
        
      });
    }
  },
    
  created() {
    this.setSongerListUrl(this.thisUrlparam)
  },
  mounted() {}
}
</script>

<style scoped>
.songers{
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap ;
  
}
.scroll{
  overflow-x: hidden;
  height: 582px;
  box-shadow: 0px 8px 10px #e0e0e0;
}
.songers > div{
  width: 180px;
  flex: 0 0 15%;
  margin: 10px 0px;
}
.content{
  max-width: 1200px;
  margin:  0 auto;
}
</style>
