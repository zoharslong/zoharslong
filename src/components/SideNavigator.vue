<template>
  <nav class="sidenavigator">
    <div class="ttl">
      <a>Pyzohar</a>
    </div>
    <li v-for="(key, index) in lst_vls" v-bind:key="index">
      <a @click="sndVls({ key })">{{ key }}</a>
    </li>
  </nav>
</template>

<script>
/* eslint-disable */
import Dts from "../../public/dts/prm_dts.js";

export default {
  name: "sidenavigator",
  props: { msg: String },
  data() {
    return {
      lst_vls: [],
      vls: "",
    };
  },
  watch: {
    msg: {
      handler: function () {
        this.lst_vls = Object.keys(Dts[this.msg]);
      }, // 当msg改变时切换展示的数据
      deep:true,
      immediate: true,
    },
  },
  methods: {
    EmtVls(nms, vls) {
      this.$emit(nms, vls);
    }, // 发送数据到父级, 需要v-on:funcName接收
    sndVls(vls) {
      this.EmtVls("fnc_psh_vls", vls.key);
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.sidenavigator {
  vertical-align: top;
  display: inline-block;
  margin: 0 0 0 5%;
  text-align: left;
  width: 15%;
  min-width: 80px;
  div.ttl {
    height: 26px;
    font-size: 20px;
    padding: 0 0 18px 0;
    a {
      line-height: 26px;
    }
  }
  li {
    padding: 6px 0;
    a {
      font-size: 14px;
      line-height: 24px;
    }
  }
  li::marker {
    color: #77a753;
  }
  li:hover {
    cursor: pointer;
    color: #77a753;
    font-weight: bold;
  }
}
</style>
