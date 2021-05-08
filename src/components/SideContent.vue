<template>
  <div class="sidecontent">
    <div class="ttl">
      <!--eslint-disable-next-line-->
      <a>{{ msg.kys }}</a>
    </div>
    <div
      class="ctt"
      v-for="(key, index) in lst_vls"
      v-bind:key="index"
      v-html="key.vls"
      :style="key.css"
    ></div>
  </div>
</template>

<script>
/* eslint-disable */
import Dts from "../../public/dts/prm_dts.js";

export default {
  name: "SideContent",
  props: { msg: Object }, // msg={'dts':'', 'kys':'oneKeyOfDts[msg.dts]'}
  data() {
    return {
      lst_ctt: [], // 指定全数据集
      lst_vls: [], // 根据view传来的msg选择将要展示的数据
    };
  },
  watch: {
    msg: {
      handler: function (lst_new) {
        this.lst_vls = this.lst_ctt[lst_new['kys']];
      }, // 当msg改变时切换展示的数据
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.lst_ctt = Dts[this.msg['dts']];
  },
};
</script>

<style scoped lang="scss">
.sidecontent {
  vertical-align: top;
  display: inline-block;
  margin: 0 5% 0 0;
  text-align: left;
  width: 75%;
  div.ttl {
    height: 26px;
    font-size: 20px;
    padding: 0 0 18px 6px;
    a {
      line-height: 26px;
    }
  }
  div.ctt {
    margin:3px 0 6px 0;
    padding: 3px 0 3px 4px; // 左侧留出两个px的用于标记线的空间, 需要与prm_ccs.js中的css配合使用
    line-height: 24px;
  }
}
</style>
