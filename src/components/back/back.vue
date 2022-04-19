<!--  -->
<template>
  <div style="position:fixed;top:91px;border-radius: 0px 26px 26px 0px / 0px 26px 26px 0px;background: rgba(240,241,242,.3);backdrop-filter: blur(10px);">
    <button @click="cl"><i class="fas fa-chevron-left"></i>返回</button>
  </div>
</template>

<script>
export default {
   name: 'back',
   components: {},
   props: {},
   data() {
      return {};
   },
   computed: {},
   watch: {},
   methods: {
      cl() {
         this.$router.go(-1);
      },
   },
   created() {},
   mounted() {},
};
</script>

<style scoped>
button {
   padding: 15px;
   border: 0px;
   font-size: 17px;
   background: none;
}
</style>
