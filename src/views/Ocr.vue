<template>
  <div class="ocr">
    <BaiduOcr msg="Optical character recognition and transpose" />
    <FooterPart msg="vue-cli, baiduOCR, flask, python, mongodb" />
  </div>
</template>

<script>
/* eslint-disable */
import BaiduOcr from "@/components/BaiduOcr.vue";
import FooterPart from "@/components/FooterPart.vue"; // @ is an alias to /src

export default {
  name: "Ocr",
  components: {
    BaiduOcr,
    FooterPart,
  },
  mounted() {
    this.$store.dispatch("fnc_tck_act"); // tick counting
    this.$store.dispatch("fnc_usa_act"); // visit log
  },
};
</script>
