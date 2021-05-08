<template>
  <div class="home">
    <img
      alt="home logo"
      style="max-height: 100px"
      src="../../public/img/logo01.gif"
    />
    <LoadingPart msg="{'cls':'.loadingpart','fmt':'fixed','dly':1}" />
    <HelloWorld msg="Welcome to xzzsmeadow.com" />
    <FooterPart msg="vue-cli, echarts, flask, python, mongodb" />
  </div>
</template>

<script>
/* eslint-disable */
import HelloWorld from "@/components/HelloWorld.vue";
import LoadingPart from "@/components/LoadingPart.vue";
import FooterPart from "@/components/FooterPart.vue"; // @ is an alias to /src

export default {
  name: "Home",
  components: {
    LoadingPart,
    HelloWorld,
    FooterPart,
  },
  mounted() {
    this.$store.dispatch("fnc_tck_act"); // tick counting
    this.$store.dispatch("fnc_usa_act"); // visit log
  },
};
</script>
