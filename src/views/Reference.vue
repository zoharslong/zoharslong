<template>
  <div class="reference">
    <img
      alt="reference logo"
      style="max-height: 100px"
      src="../../public/img/logo02.gif"
    />
    <DiaryWords msg="A little story on panorama of age" />
    <FooterPart msg="vue-cli, flask, python, mongodb" />
  </div>
</template>

<script>
/* eslint-disable */
import DiaryWords from "@/components/DiaryWords.vue"; // @ is an alias to /src
import FooterPart from "@/components/FooterPart.vue";

export default {
  name: "Reference",
  components: {
    DiaryWords,
    FooterPart,
  },
  mounted() {
    this.$store.dispatch("fnc_tck_act"); // tick counting
    this.$store.dispatch("fnc_usa_act"); // visit log
  },
};
</script>
