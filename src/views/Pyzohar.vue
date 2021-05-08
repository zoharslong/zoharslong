<template>
  <div class="pyzohar">
    <SideNavigator :msg="key_vls.dts" v-on:fnc_psh_vls="fnc_snd_vls" />
    <SideContent :msg="key_vls" />
    <FooterPart msg="vue-cli, baiduOCR, flask, python, mongodb" />
  </div>
</template>

<script>
/* eslint-disable */
import SideNavigator from "@/components/SideNavigator.vue";
import SideContent from "@/components/SideContent.vue";
import FooterPart from "@/components/FooterPart.vue";

export default {
  name: "Pyzohar",
  components: {
    SideNavigator,
    SideContent,
    FooterPart,
  },
  data() {
    return {
      key_vls: {'dts': 'dct_rtl_pyzohar'}, // 存放从SideNavigator向上传出的信息, 并通过prop传入SideContent
    }
  },
  methods: {
    fnc_snd_vls(vls) {
      this.key_vls.kys = vls; // this.key_vls = {dts:'dct_rtl_pyzohar', kys:''}
    } // 接收从component上传的vls, 存入this.key_vls, 构建一个key_vls = {dts: 目标数据集的key, kys: 目标数据集中需要调取的内容的key}
  },
  mounted() {
    this.fnc_snd_vls('开始'); // 初始化调取key为'开始'的内容
    this.$store.dispatch("fnc_tck_act"); // tick counting
    this.$store.dispatch("fnc_usa_act"); // visit log
  },
};
</script>

<style scoped>
</style>
