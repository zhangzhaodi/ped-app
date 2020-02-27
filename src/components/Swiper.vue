<template>
  <!-- <swiper v-show="showControl" :slots="dataSlots" :options="dataSlots.swiperOption" ref="mySwiper" :class="posControl">
    <swiper-slide v-for="(item, index) in dataSlots.bannarList" :key="index">
      <img class="bannar" :src="item.pictureOuterUrl">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper> -->

  <swiper v-show="showControl"
          ref="mySwiper"
          :options="swiperOption">
    <swiper-slide v-for="(item, index) in bannarList"
                  :key="index">
      <img class="bannar"
           :src="item.pictureOuterUrl">
    </swiper-slide>
    <!-- <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div> -->
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    // dataSlots: {
    swiperOption: {
      type: Object,
      default: () => {
        return {}
      }
    },
    bannarList: {
      type: Array,
      default: () => {
        return []
      }
    }
    // position: {
    //   type: String,
    //   default: ''
    // }
    // }
  },
  data() {
    return {}
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    showControl() {
      if (this.bannarList && this.bannarList.length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    action(item) {
      console.log(item)
      if (item.clickUrl !== undefined && item.clickUrl !== null) {
        window.location.href = item.clickUrl
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.swiper-container {
  width: 100%;
  height: px2vw(200);
  padding: px2vw(14) 0;
  background: #fff;
}
.bannar {
  width: 100%;
  height: 100%;
  border-radius: px2vw(10);
}
.swiper-slide {
  width: px2vw(325);
}
.swiper-container-3d .swiper-slide-shadow-left,
.swiper-container-3d .swiper-slide-shadow-right {
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0)
  ) !important;
}
.swiper-pagination {
  position: relative !important;
  bottom: 0 !important;
  left: 0;
  width: 98% !important;
}
</style>