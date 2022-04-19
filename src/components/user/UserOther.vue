<!--  -->
<template>
  <div class="ty">
        <div class="area">
            <span>语种：</span>
            <template v-for="(item,index) in languages" :key="index">
                <input type="radio" :id="`language${index}`" v-model="language" :value="item.val" name="area">
                <label :for="`language${index}`" @click="setlanguageIndex(index)"><span :class="{'active':this.languageIndex==index}">{{item.name}}</span></label>|
            </template>
        </div>
        <div class="type">
            <span>分类：</span>
             <template v-for="(item,index) in types" :key="index">
                <input type="radio" :id="`type${index}`" v-model="type" :value="item.val" name="type">
                <label :for="`type${index}`" @click="settypeIndex(index)"><span :class="{'active':this.typeIndex==index}">{{item.name}}</span></label>|
            </template>
        </div>
        <div class="initial">
            <span>筛选：</span>
            <template v-for="(item,index) in initials" :key="index">
                <input type="radio" :id="`initial${index}`" v-model="initial" :value="(index==0 || index ==initials.length-1)?item.val:String.fromCodePoint(item.val)" name="initial">
                <label :for="`initial${index}`" @click="setinitialIndex(index)"><span :class="{'active':this.initialIndex==index}">{{item.name}}</span></label>|
            </template>
        </div>
  </div>
</template>

<script>
import { _getSongerList } from '../../network/details'

export default {
  name: 'UserOther',
  components: {},
  props: {
      msg:Object
  },
  data() {
    return {
        language:-1,
        type:-1,
        initial:-1,
        languageIndex:0,
        typeIndex:0,
        initialIndex:0
    }
  },
  computed: {
      setparams(){
          return `area=${this.language}&type=${this.type}&initial=${this.initial}`
      },


  },
  watch: {
      language(newval){
          //artists ,code ,more(用于分页)
          this.emit();
      },
      type(newval){
          this.emit();
      },
      initial(newval){
          this.emit();
      },
  },
  methods: {
      setlanguageIndex(index){
          this.languageIndex=index
      },
      settypeIndex(index){
          this.typeIndex=index
      },
      setinitialIndex(index){
          this.initialIndex=index
      },
      emit(){
          _getSongerList(this.setparams).then((result) => {
              result.data.param=this.setparams
              this.$emit('updateSonger',result.data)
          }).catch((err) => {
              
          });
      }

  },
  setup(props){
      return{
        languages:props.msg.language,
        types:props.msg.type,
        initials:props.msg.initial
      }
      
  },
  created() {},
  mounted() {}
}
</script>

<style scoped>
input[type='radio']{
    display: none;
}
label{
    display: inline-block;
    padding: 8px 0px;
    margin: 0px 8px;
    white-space:nowrap;
    color: #666;
}
label > span {
    display: inline-block;
    padding: 5px 15px;
    border-radius: 2em;
}
label:hover span{
    
    background: rgb(253,238,238);
}
.ty{
    margin: 0 auto;
}
.ty > div{
    text-align: left;
    color: rgb(243,243,243);
}
.ty > div > span{
    color: #666;
}
.initial{

}
.active{
    background: rgb(253,238,238);
    color: red;
}
</style>
