<template>
  <div class="footerpart">
    <div class="ftr_dcr"></div>
    <div class="ftr_ctt">
      <div class="ftr_lns">
        <div style="width: 15%; float: left; text-align: left">
          <label>
            <input placeholder="VIPCode" type="text" v-model="vls_vip" />
          </label>
        </div>
        <div style="width: 83%">
          Built with {{ msg }}. Presented by zoharslong
        </div>
      </div>
      <div class="ftr_lns">
        <a
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502004011"
        >
          粤公网安备 44030502004011号
        </a>
        |
        <a href="http://beian.miit.gov.cn">粤ICP备19029952号-1</a>
        |
        <a @click="reLod()">{{ vls_nfo }}</a>
        |
        <a @click="toTop()">toTop</a>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import $ from 'jquery';

export default {
  name: "FooterPart",
  props: { msg: String },
  data() {
    return {
      vls_vip: "",
    };
  },
  computed: {
    vip() {
      return this.$store.state.vip;
    },
    usa_msg() {
      return this.$store.state.usa_msg;
    }, // got value vuex.$store.state.usa_msg
    vls_nfo() {
      return this.usa_msg.msg + ', ' + this.usa_msg.nfo;
    },
  },
  watch: {
    vls_vip: {
      handler: function () {
        this.$store.commit("fnc_vip", this.vls_vip);
      },
    },
  },
  methods: {
    toTop() {
      console.log(this.$store.state.tck); // 顺便检查一下当次登录的停留时长
      if (parseFloat($('html').scrollTop()) > 0){
        $('html').animate({scrollTop: 0}, 200);
      } // 滚动到顶部
    },
    reLod() {
      this.$router.push('/'); // location.reload()不适合历史路由
    },
  },
  mounted() {
    if (this.vls_vip === "" && this.vip !== "") {
      this.vls_vip = this.vip;
    } // 初始化同步vuex.store.state.vip到this.vls_vip
  },
};
</script>

<style scoped lang="scss">
.footerpart {
  background-color: #e0e0e0;
  color: #616161;
  position: relative;
  bottom: 0;
  min-height: 53px;
  width: 100%;
  margin: 15px 0;
  background-position: bottom;
  .ftr_dcr {
    margin-bottom: 15px;
    height: 3px;
    background-color: #c4d9a9;
  } // footer decoration line
  .ftr_ctt {
    padding: 0 5%;
    text-align: right;
    div.ftr_lns {
      vertical-align: top;
      padding: 0 0 8px 0;
      font-size: 12px;
      div {
        display: inline-block;
      }
      input {
        outline-style: none;
        border: 0;
        margin: 0;
        font-size: 12px;
        padding: 0 3px 0 0;
        height: 14px;
        width: 90%;
        min-width: 60px;
        color: #616161;
        background-color: #e0e0e0;
      }
      input:hover {
        color: #f5f5f5;
        animation: turnbackground 1.5s infinite;
      }
      a {
        font-size: 12px;
      }
      a:link {
        text-decoration: none;
        color: #204837;
      }
      a:visited {
        text-decoration: none;
        color: #616161;
      }
      a:hover {
        cursor: pointer;
        color: #77a753;
      }
    }
  } // footer content
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
