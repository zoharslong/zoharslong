<template>
  <div class="licenseplate">
    <LicensePrediction
      msg="Prediction on ShenZhen License Plate Price"
      v-on:fnc_psh_vls="fnc_snd_bnr"
    />
    <ShowBanner :msg="lst_vls" />
    <FooterPart msg="vue-cli, echarts, flask, python, mongodb" />
  </div>
</template>

<script>
/* eslint-disable */
import LicensePrediction from "@/components/LicensePrediction.vue";
import ShowBanner from "@/components/ShowBanner.vue";
import FooterPart from "@/components/FooterPart.vue"; // @ is an alias to /src

export default {
  name: "LicensePlate",
  components: {
    LicensePrediction,
    ShowBanner,
    FooterPart,
  },
  data() {
    return {
      lst_vls: [], // data transmission From LicensePrediction to ShowBanner
    };
  },
  methods: {
    fnc_snd_bnr(vls) {
      let flt_len = vls.length;
      if (isNaN(vls[flt_len - 1][2]) && isNaN(vls[flt_len - 1][3])) {
        this.lst_vls = [];
      } else {
        this.lst_vls = [
          {
            id_img: "01",
            vls_ttl: "随便试试",
            vls_sbt: "建议的报价为",
            vls_ppd: "本策略的最终目的是擦线上车，没上成也不要难过",
            vls_hlt: NaN,
          },
          {
            id_img: "02",
            vls_ttl: "真心想要",
            vls_sbt: "建议的报价为",
            vls_ppd: "相对稳妥的低价策略",
            vls_hlt: NaN,
          },
          {
            id_img: "01",
            vls_ttl: "基本稳了",
            vls_sbt: "建议的报价为",
            vls_ppd: "如果不放心可以提到这个档次",
            vls_hlt: NaN,
          },
          {
            id_img: "02",
            vls_ttl: "就是有钱",
            vls_sbt: "建议的报价为",
            vls_ppd: "没说的，如果肯出这个价你还来测啥",
            vls_hlt: NaN,
          },
        ];
        this.lst_vls[0]["vls_hlt"] = vls[flt_len - 1][2];
        this.lst_vls[1]["vls_hlt"] = vls[flt_len - 1][3];
        this.lst_vls[2]["vls_hlt"] = vls[flt_len - 1][5];
        this.lst_vls[3]["vls_hlt"] = vls[flt_len - 1][6];
      }
    }, // 将LicensePrediction获得的数据经过v-on函数完全处理后使用this.lst_vls同步到ShowBanner
  },
  mounted() {
    this.$store.dispatch("fnc_tck_act"); // tick counting
    this.$store.dispatch("fnc_usa_act"); // visit log
  },
};
</script>
