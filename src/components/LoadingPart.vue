<template>
  <div class="loadingpart" :style="css_cls">
    <div class="loadpic" :style="css_lpc">
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import $ from "jquery";

export default {
  name: "LoadingPart",
  props: { msg: String }, // in format '{"cls":"","dly":["",int],"fmt":["fixed","relative"]}' or ""
  data() {
    return {
      msg_prm: {}, // 用于接收this.msg传入的json-str格式的参数
      css_cls: { position: "relative" }, // style for loadingpart
      css_lpc: { position: "relative" }, // style for loadpic
    };
  },
  mounted() {
    if (this.msg !== "") {
      this.msg_prm = eval("(" + this.msg + ")");
      if (this.msg_prm["fmt"] === "fixed") {
        this.css_cls = { position: "fixed", top: 0, left: 0 };
        this.css_lpc = { position: "absolute" };
      } // fmt: ['fixed'] for 全页覆盖
      if (this.msg_prm["dly"] !== "") {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let self = this;
        // this.$store.commit("fnc_tck_nit"); // 计时前对全局计时变量进行初始化
        setTimeout(() => {
          $(self.msg_prm["cls"]).fadeOut();
        }, self.msg_prm["dly"] * 1000);
      } // dly: int for 定时fadeOut
    }
  }, // 初始化运行该计时和触发渐隐效果的方法
};
</script>

<style scoped lang="scss">
.loadingpart {
  z-index: 100;
  width: 100%;
  height: 100%;
  text-align: center;
  background: #ffffff;
  .loadpic {
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 50px;
    height: 50px;
    i {
      display: block;
      float: left;
      width: 6px;
      height: 50px;
      background: #d1887e;
      margin: 0 2px;
      transform: scaleY(0.4);
      animation: load 1.2s infinite;
    }
    i:nth-child(1) {
      animation-delay: 0.1s;
    }
    i:nth-child(2) {
      animation-delay: 0.2s;
    }
    i:nth-child(3) {
      animation-delay: 0.3s;
    }
    i:nth-child(4) {
      animation-delay: 0.4s;
    }
    i:nth-child(5) {
      animation-delay: 0.5s;
    }
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
