<template>
  <div class="signature" v-show="isShow">
    <div class="topBar">
      <button class="textButton" @click="onDone(true)">取消</button>
      <button class="textButton_Done" @click="onDone(false)">完成</button>
    </div>
    <div class="paperCanvas">
      <canvas id="tt" class="ePaperCanvas"></canvas>
    </div>
    <div class="bottomBar">
      <div class="bottomCol">
        <input class="bottomButton undo" type="button" @click="undo()" />
      </div>
      <div class="bottomCol">
        <input class="bottomButton redo" type="button" @click="redo()" />
      </div>
      <div class="bottomCol">
        <input
          class="bottomButton clear"
          type="button"
          @click="clearCanvas()"
        />
      </div>
      <div class="bottomCol">
        <input class="bottomButton color" type="button" @click="openColorset" />
      </div>
      <div class="bottomCol">
        <input
          class="bottomButton stroke"
          type="button"
          @click="openSizeset()"
        />
      </div>
    </div>
    <ol class="palette" ref="palette">
      <li
        @click="pickColor('green')"
        value="green"
        style="background-color:green"
      >
        绿色
      </li>
      <li
        @click="pickColor('yellow')"
        value="yellow"
        style="background-color:yellow"
      >
        黄色
      </li>
      <li @click="pickColor('blue')" value="blue" style="background-color:blue">
        蓝色
      </li>
      <li @click="pickColor()" value="black" style="background-color:black">
        黑色
      </li>
      <li @click="pickColor('red')" value="red" style="background-color:red">
        红色
      </li>
    </ol>
    <ol class="penSize" ref="penSize">
      <li @click="pickFont('1')">
        <input type="radio" name="fSize" value="1" />
        <div>特粗</div>
      </li>
      <li @click="pickFont('2')">
        <input type="radio" name="fSize" value="2" />
        <div>粗</div>
      </li>
      <li @click="pickFont('3')">
        <input type="radio" name="fSize" value="3" checked="checked" />
        <div>中</div>
      </li>
      <li @click="pickFont('4')">
        <input type="radio" name="fSize" value="4" />
        <div>细</div>
      </li>
      <li @click="pickFont('5')">
        <input type="radio" name="fSize" value="5" />
        <div>特细</div>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  props: {
    //是否展示手写签名
    showElSign: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: this.showElSign,
      myepaper: null,
      penSizeOl: null,
      paletteOl: null,
      isPenSizeShow: null,
      isPaletteShow: null
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  watch: {
    //监听父组件变化，并赋值
    showElSign: {
      handler(val) {
        this.isShow = val;
      }
    }
  },
  methods: {
    init() {
      this.penSizeOl = this.$refs.penSize;
      this.paletteOl = this.$refs.palette;

      this.myepaper = new EPaper("tt");
      this.$nextTick(() => {
        this.myepaper.setPenSize(3);
        this.myepaper.setPenColor(0, 0, 0);
      });
      this.myepaper.setPenSize(3);
      this.myepaper.setPenColor(0, 0, 0);
      //选择颜色
    },
    //选择颜色
    pickColor(color) {
      if (color == "green") {
        this.myepaper.setPenColor(0, 255, 0);
      } else if (color == "yellow") {
        this.myepaper.setPenColor(255, 255, 0);
      } else if (color == "blue") {
        this.myepaper.setPenColor(0, 0, 255);
      } else if (color == "red") {
        this.myepaper.setPenColor(255, 0, 0);
      } else if (color == "black") {
        this.myepaper.setPenColor(0, 0, 0);
      }
      this.isPenSizeShow = 0;
      this.isPaletteShow = 0;
      this.penSizeOl.style.display = "none";
      this.paletteOl.style.display = "none";
    },
    pickFont(value) {
      this.myepaper.setPenSize(value);
      this.isPenSizeShow = 0;
      this.isPaletteShow = 0;
      this.penSizeOl.style.display = "none";
      this.paletteOl.style.display = "none";
    },
    getData() {
      return this.myepaper.getHandWritingData();
    },
    undo() {
      this.myepaper.undo();
    },
    redo() {
      this.myepaper.redo();
    },
    clearCanvas() {
      this.myepaper.clear();
    },
    replay() {
      this.myepaper.replay();
    },
    getPng() {
      var pngUrl = this.myepaper.getHandWritingPng();
      return pngUrl;
    },
    openColorset() {
      if (this.isPaletteShow) {
        this.isPenSizeShow = 0;
        this.isPaletteShow = 0;
        this.penSizeOl.style.display = "none";
        this.paletteOl.style.display = "none";
      } else {
        this.isPaletteShow = 1;
        this.paletteOl.style.display = "inline";
        this.isPenSizeShow = 0;
        this.penSizeOl.style.display = "none";
      }
    },
    openSizeset() {
      if (this.isPenSizeShow) {
        this.isPenSizeShow = 0;
        this.isPaletteShow = 0;
        this.penSizeOl.style.display = "none";
        this.paletteOl.style.display = "none";
      } else {
        this.isPenSizeShow = 1;
        this.penSizeOl.style.display = "inline";
        this.isPaletteShow = 0;
        this.paletteOl.style.display = "none";
      }
    },
    cfcaIsAndroidOS() {
      return /(Android)/i.test(navigator.userAgent);
    },
    cfcaIsIOS() {
      return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
    },
    //取消
    onDone(isCancel) {
      if (isCancel) {
        console.log(111);
      } else {
        // console.log(this.myepaper.getHandWritingData());
        // console.log(this.myepaper.getHandWritingPng());
        this.myepaper.getHandWritingPng((data, pamars) => {
        });
      }
      this.$emit("onDone", [
        isCancel,
        this.myepaper.getHandWritingData(),
        this.myepaper.getHandWritingPng()
      ]);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./paper.css";
</style>
