<script setup>
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { onMounted, reactive } from 'vue';
import 'swiper/css';
import 'swiper/css/bundle';
import { _getBanner } from '../../../network/discover';

const obj = reactive({
   bannerData: null,
});
//config
const swiperConfig = {
   autoplay: {
      delay: 3000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
   },
};

//swiper event
const onSwiper = swiper => {
   swiper.slideNext();
};
const onSlideChange = runCallbacks => {
   // console.log('slide change');
   // console.log(runCallbacks);
};

//modules
let modules = [Navigation, Pagination, Scrollbar, A11y];

//axios请求
const getBanner = () => {
   _getBanner()
      .then(result => {
         obj.bannerData = result.data;
      })
      .catch(err => {
         console.log(err);
      });
};

//图片点击事件
const action = item => {
   console.log(item);
   alert(item.typeTitle);
};

//生命周期
onMounted(() => {
   getBanner();
});
</script>

<template>
  <div>
    <!-- 歌 专辑路由  -->
    <swiper :modules="modules"
            :slides-per-view="1"
            :space-between="0"
            navigation
            reverseDirection
            observer
            loop
            observeParents
            :autoplay="swiperConfig.autoplay"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            :pagination="{ clickable: true }">
      <template v-if="obj.bannerData!=null">
        <swiper-slide v-for="item in obj.bannerData.banners"
                      :key="item.bannerId">
          <div class="banner-item"
               @click="action(item)">
            <img :src="item.pic"
                 alt="">
            <span :style="{background:item.titleColor}">{{item.typeTitle}}</span>
          </div>
        </swiper-slide>
      </template>

    </swiper>
  </div>
</template>

<style scoped>
.swiper-button-next,
.swiper-button-prev {
   height: 23px !important;
}
.swiper img {
}
.banner-item {
   width: 90%;
   border-radius: 1em;
   box-sizing: border-box;
   border: 3px solid white;
   background: var(--bg);
   box-shadow: 3px 0px 4px var(--rd);
   font-size: 62.5%;
   position: relative;
   margin: 0 auto;
}
.banner-item img {
   width: 100%;
   border-radius: inherit;
}
.banner-item > span {
   position: absolute;
   display: inline-block;
   box-sizing: border-box;
   padding: 1% 2%;
   border-radius: 5px;
   right: 3px;
   font-size: 1em;
   bottom: 6px;
   color: white;
}
</style>