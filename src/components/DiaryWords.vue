<template>
  <div class="diarywords">
    <h3>{{ msg }}</h3>
    <div class="bnr">
      <div class="bnr_npt">
        <!--eslint-disable-next-line-->
        <button v-for="(key, index) in lst_clk" @click="chs_rtl({ key })" v-bind:key="index">
          {{ key }}
        </button>
      </div>
    </div>
    <div class="ctt">
      <!--eslint-disable-next-line-->
      <div class="lns" v-for="line in lst_rtc">
        <a>{{ line }}</a>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Rtl from "../../public/dts/prm_dts.js";

export default {
  name: "DiaryWords",
  props: { msg: String },
  data() {
    return {
      lst_ttl: Rtl["dct_rtl_ouchcat"],
      lst_key: [], // 全部文章的key
      lst_clk: [], // 当前展示的至多五个key
      lst_rtc: [
        "Here is a dustbin filled with useless things.",
        "Check the label list on the right side of this page.",
      ], // 用于存放当前所选文章的
    };
  },
  methods: {
    chs_rtl(vls) {
      this.lst_rtc = this.lst_ttl[vls["key"]]; // 根据param vls指定当前选定展示的文章
      let tmp = [];
      for (let i = -2; i < 3; i++) {
        if (
          this.lst_key.indexOf(vls["key"]) + i >= 0 &&
          this.lst_key.indexOf(vls["key"]) + i < this.lst_key.length
        ) {
          tmp.push(this.lst_key[this.lst_key.indexOf(vls["key"]) + i]);
        }
      }
      this.lst_clk = tmp; // 根据param vls指定当前文章前后合计五篇文章的key进入点选列表
    }, // 展示文章内容及根据当前展示的文章更新点选列表
    mnt_clk() {
      let tmp = [];
      for (let i = 0; i < 3; i++) {
        tmp.push(this.lst_key[i]);
      }
      this.lst_clk = tmp;
    }, // 初始化时获取前三个文章的key进入点选列表
  },
  mounted() {
    this.lst_key = Object.keys(this.lst_ttl); // 初始化时从数据中获取文章key的列表
    this.mnt_clk(); // 初始化点选列表
  },
};
</script>

<style scoped lang="scss">
.diarywords {
  padding: 0 5%;
  div.bnr {
    text-align: right;
    width: 100%;
    margin: 0 0 15px 0;
    .bnr_npt {
      height: 28px;
      button {
        outline-style: none;
        border: 0;
        margin: 0 0 0 3px;
        font-size: 12px;
        padding: 6px 3px;
        width: 5%;
        min-width: 30px;
        background-color: #ffffff;
      }
      button:hover {
        cursor: pointer;
        color: #f5f5f5;
        background-color: #c4d9a9;
      }
    }
  }
  div.ctt {
    padding: 0 5% 0 10%;
    text-align: justify;
    div.lns {
      margin: 0 0 10px 0;
    }
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
