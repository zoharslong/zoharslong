<template>
  <div class="showbanner">
    <!--eslint-disable-next-line-->
    <div v-for="cll in lst_vls">
      <div class="lst_img">
        <img :src="cll.vls_img" alt="" />
      </div>
      <div class="lst_ctt">
        <div class="ctt_lns">
          <div v-if="cll.vls_ttl !== ''" style="font-weight: bold">
            {{ cll.vls_ttl }}
          </div>
          <div v-if="cll.vls_sbt !== ''" style="font-size: 12px">
            {{ cll.vls_sbt }}
          </div>
          <div v-if="cll.vls_ppd !== ''" style="font-size: 12px">
            {{ cll.vls_ppd }}
          </div>
        </div>
        <div class="ctt_hlt">
          <a>{{ cll.vls_hlt }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Prm from "../../public/dts/prm_css.js";

export default {
  name: "ShowBanner",
  props: { msg: Object }, // in format [{id_img: "",vls_ttl: "",vls_sbt: "",vls_ppd: "",vls_hlt:""},{},..]
  data() {
    return {
      lst_vls: [], // in format [{id_img: "",vls_ttl: "",vls_sbt: "",vls_ppd: "",vls_hlt:""},{},..]
      dct_img: Prm.img_bsc, // 图片转换字典
    };
  },
  watch: {
    msg: {
      handler: function (lst_new) {
        this.lst_vls = lst_new;
        for (let i = 0; i < lst_new.length; i++) {
          this.lst_vls[i]["vls_img"] = this.dct_img[lst_new[i]["id_img"]];
        } // 利用图片转换字典引入图片参数
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.showbanner {
  div {
    height: 90px;
    margin: 5%;
    padding: 12px 5%;
    text-align: left;
    vertical-align: middle;
    box-shadow: 1px 2px 2px 2px #e0e0e0;
    -moz-box-shadow: 1px 2px 2px 2px #e0e0e0;
    -webkit-box-shadow: 1px 2px 2px 2px #e0e0e0;
    div {
      display: inline-block;
      margin: 0;
      padding: 0;
      box-shadow: 0 0 0 0;
    }
    div.lst_img {
      height: 90px;
      width: 25%;
      text-align: center;
      overflow: hidden;
      object-fit: cover;
      img {
        max-height: 90px;
        overflow: hidden;
        object-fit: cover;
      }
    }
    div.lst_ctt {
      width: 75%;
      height: 90px;
      text-align: right;
      div.ctt_lns {
        width: 70%;
        vertical-align: middle;
        div {
          width: 100%;
          font-size: 14px;
          line-height: 18px;
          height: 18px;
          margin: 6px 0;
        }
      }
      div.ctt_hlt {
        margin: 6px 0;
        width: 25%;
        height: 78px;
        text-align: right;
        font-size: 24px;
        font-weight: bold;
        line-height: 78px;
      }
    }
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
