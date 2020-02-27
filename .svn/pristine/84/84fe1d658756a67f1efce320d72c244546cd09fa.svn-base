<template>
  <!-- 接受插槽传过来的值 -->
  <!-- <Ltop></Ltop>  -->

  <div class="outer">
    <sidebar :letter="letter" :isSearch="isSearch" :isAdd="isAdd"></sidebar>
    <list
      :letter="letter"
      :isAdd="isAdd"
      :isSearch="isSearch"
      :addTo="addTo"
      :addPlaceholder="addPlaceholder"
      :searchPlaceholder="searchPlaceholder"
      :backRouter='backRouter'
    ></list>
  </div>
</template>

<script>
import sidebar from "./components/sidebar";
import list from "./components/list";
export default {
  components: {
    sidebar,
    list,
  },
  props: {
    letterLists: {
      default: []
    },
    isSearch: {
      type: Boolean,
      default: true
    },
    searchPlaceholder: {
      type: String,
      default: "姓名/银行名/卡号后四位"
    },
    isAdd: {
      type: Boolean,
      default: true
    },
    addPlaceholder: {
      type: String,
      default: "新增收款人"
    },
    addTo: {
      type: String,
      default: "addPayer"
    },
    backRouter: {
      type: String,
      required: true
    }
  },
  created() {
    // console.log(this.$store.state.linkmanList);
    let arr = [];
    let array = [];
    for (let key in this.$store.state.linkmanList) {
      arr.push(key);
    }
    this.letter.map(item => {
      //   console.log(item, arr.indexOf(item), arr.indexOf(item) == -1);
      if (arr.indexOf(item) != -1) {
        array.push(item);
      }
    });
    this.letter = array;
  },
  data() {
    return {
      letter: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  },
  methods: {},

  mounted() {
    let letterList = [...document.getElementsByClassName("letter")];
    // console.log(letterList);
    letterList.map(item => {
      //   console.log(item.offsetTop);
    });
    let letters = [...document.getElementsByClassName("item")];
    // console.log(letters);
    letters.map(item => {
      item.onclick = function() {
        //点击item后屏幕滚动到对于的位置
        clearClass();
        this.className += " active";
        document.documentElement.scrollTop =
          letterList[letters.indexOf(item)].offsetTop;
        document.body.scrollTop = letterList[letters.indexOf(item)].offsetTop;
      };
    });
    window.onscroll = function() {
      let top = document.documentElement.scrollTop;
      for (let i = 0; i < letterList.length; i++) {}
    };
    function clearClass() {
      letters.map(item => {
        item.className = "item";
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>