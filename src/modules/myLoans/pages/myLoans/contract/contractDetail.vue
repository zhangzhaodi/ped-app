<template>
  <div class="outer">
    <div class="header">
      <Myheader :title="$route.meta.title" :params="headerParams"></Myheader>
    </div>
    <Scroller></Scroller>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";

export default {
  components: {
    Myheader: Header,
    Scroller
  },
  data() {
    return {
      headerParams: {
        leftShow: true,
        rightShow: true
      }
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.outer {
  .scrollerBox {
    background: none;
    padding: px2vw(30);
  }
}
</style>
