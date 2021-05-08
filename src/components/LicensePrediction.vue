<template>
  <div class="licenseprediction">
    <h3>{{ msg }}</h3>
    <div class="bnr">
      <div class="bnr_npt">
        <label>
          <input type="number" placeholder="初次公布" v-model="vls_npt.frs" />
        </label>
        <label>
          <input type="number" placeholder="二次公布" v-model="vls_npt.scd" />
        </label>
        <input
          type="button"
          title="输入前面两次报价后点这里预测"
          id="npt-btn"
          :value="vls_btn_npt[0]"
          :disabled="vls_btn_npt[1]"
          @click="sndVls()"
        />
        <input
          type="button"
          title="当图表显示异常时点这里刷新"
          id="npt-rld"
          value="Reload"
          @click="rldWnd()"
        />
      </div>
    </div>
    <div id="div-cht" style="height: 400px"></div>
  </div>
</template>

<script>
/* eslint-disable */
// import Prm from "../assets/css/prm_css.js";
// import Dts from "../assets/dts/prm_dts.js";
import Dts from "../../public/dts/prm_dts.js";
import Prm from "../../public/dts/prm_css.js";
import Fnc from "../assets/js/prm_fnc.js";
import Ech from "../assets/js/prm_ech.js";

export default {
  name: "LicensePrediction",
  props: { msg: String },
  data() {
    return {
      lst_licensepredict: Dts.lst_prm_license,
      vls_btn_npt: ["Show", false],
      vls_npt: { frs: "", scd: "" },
      myChart: null, // 用于存放已经实例化并指定div的echarts对象，同时负责该对象的销毁
      myChart_prm: {
        prm_zom: [50, 100],
        prm_yxs: { yAxNms: ["Price"] }, // 纵轴数量及命名
        prm_lgd: {
          barWdh: "18%", // 如果为柱状图则设定柱宽度
          lgdTyp: ["line", "line", "line", "line", "line", "line"], // 数据组的图类型 in ['line','bar','scatter']
          lgdLns: ["solid", "dotted", "dotted", "solid", "dotted", "dotted"], // 数据组的线类型 in [solid','dashed','dotted']
          lgdAxs: [0, 0, 0, 0, 0, 0], // 数据组对应的y轴编号
          lgdStk: ["1", "2", "3", "4", "5", "6"], // 数据组对应的堆叠分类
          lgdClr: [
            Prm.clr_bsc["995"],
            Prm.clr_bsc["012"],
            Prm.clr_bsc["010"],
            Prm.clr_bsc["993"],
            Prm.clr_bsc["040"],
            Prm.clr_bsc["050"],
          ], // 数据组对应的颜色
        },
      },
    };
  },
  computed: {
    echarts() {
      return this.$store.state.ect;
    }, // 在组件中调用vuex的方法
  },
  watch: {
    vls_npt: {
      handler: function (vls_new) {
        let flt_len = this.lst_licensepredict.length;
        this.lst_licensepredict[flt_len - 1][7] = parseInt(this.vls_npt.frs);
        this.lst_licensepredict[flt_len - 1][8] = parseInt(this.vls_npt.scd);
        if (vls_new.frs !== "" && vls_new.scd !== "") {
          this.vls_btn_npt[0] = "Predict";
        } else {
          this.vls_btn_npt[0] = "Show";
        } // 根据选项状态决定按钮状态
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    ChkDsp(tgt_obj) {
      if (tgt_obj != null && tgt_obj !== "" && tgt_obj !== undefined) {
        tgt_obj.dispose();
      } // 销毁模块
    }, // 如果目标存在则销毁目标
    LnsCht(div_cht, lst_dts, str_ttl, dct_prm) {
      this.ChkDsp(this.myChart); // 如果目标存在则销毁
      // var echarts = this.$store.state.ect;
      let dom = document.getElementById(div_cht);
      let myChart = this.echarts.init(dom);
      let yxs_srs = Ech.fnc_gnr_yxs(dct_prm.prm_yxs);
      let lgd_srs = Ech.fnc_gnr_lgd(dct_prm.prm_lgd);
      let ptn_prt = {
        color: dct_prm.prm_lgd.lgdClr, // 默认取色列表
        title: { text: str_ttl }, // 填入标题文本
        dataZoom: [
          { start: dct_prm.prm_zom[0], end: dct_prm.prm_zom[1] },
          { start: dct_prm.prm_zom[0], end: dct_prm.prm_zom[1] },
        ], // 缩放起止点
        yAxis: yxs_srs, // 根据dct_prm.prm_yxs生成的y轴参数
        series: lgd_srs, // 根据dct_prm.prm_lgd生成的数据参数
        dataset: { source: lst_dts, sourceHeader: true },
      }; // echarts.option的变动部分
      let ptn_mrg = Fnc.deepmerge.all([ptn_prt, Ech.ptn_ech]); // 合并成完整的echarts.option
      myChart.setOption(ptn_mrg); // 使用刚指定的配置项和数据显示图表。
      this.myChart = myChart; // 用于在运行图表前销毁原有的图
    }, // build line chart (targetDiv, Dataset, Title.text)
    CmpCht(dct_mdl_prm) {
      let flt_len = this.lst_licensepredict.length;
      if (this.vls_npt.frs !== "" && this.vls_npt.scd !== "") {
        let lsx = [1, 0, 0, 0, 0, 0];
        lsx[1] = this.lst_licensepredict[flt_len - 1][7];
        lsx[2] =
          (this.lst_licensepredict[flt_len - 2][4] -
            this.lst_licensepredict[flt_len - 2][1]) /
          this.lst_licensepredict[flt_len - 2][1];
        lsx[3] =
          (lsx[1] - this.lst_licensepredict[flt_len - 2][7]) /
          this.lst_licensepredict[flt_len - 2][7];
        lsx[4] = (this.lst_licensepredict[flt_len - 2][4] - lsx[1]) / lsx[1];
        lsx[5] = (this.lst_licensepredict[flt_len - 1][8] - lsx[1]) / lsx[1];
        this.lst_licensepredict[flt_len - 1][2] = Fnc.fnc_sum(
          dct_mdl_prm.prm_low,
          lsx
        ); // 两两相乘相加预测底价
        this.lst_licensepredict[flt_len - 1][3] = parseInt(
          this.lst_licensepredict[flt_len - 1][2] + dct_mdl_prm.prm_std[0]
        );
        this.lst_licensepredict[flt_len - 1][5] = Fnc.fnc_sum(
          dct_mdl_prm.prm_avg,
          lsx
        ); // 两两相乘相加预测均价
        this.lst_licensepredict[flt_len - 1][6] = parseInt(
          this.lst_licensepredict[flt_len - 1][5] + dct_mdl_prm.prm_std[1]
        );
      } else {
        let flt_len_row = this.lst_licensepredict[0].length;
        for (let j = 1; j < flt_len_row - 2; j++) {
          this.lst_licensepredict[flt_len - 1][j] = NaN;
        }
      } // 当两个input均有值时计算, 否则还原原数据集
    }, // computing the last line of this.lst_licensepredict
    EmtVls(nms, vls) {
      this.$emit(nms, vls);
    }, // 发送数据到父级, 需要v-on:funcName接收
    sndVls() {
      this.CmpCht(Dts.mdl_prm_license);
      this.LnsCht(
        "div-cht",
        this.lst_licensepredict,
        "Prediction of License Plate Price",
        this.myChart_prm
      );
      this.EmtVls("fnc_psh_vls", this.lst_licensepredict);
    }, // calculation and charting again
    rldWnd() {
      this.vls_npt = { frs: "", scd: "" }; // 终极reload方法: window.location.reload();
      this.sndVls(
        "div-cht",
        this.lst_licensepredict,
        "License Plate Price",
        this.myChart_prm
      );
    }, // reloading echarts because unknown error
  },
  mounted() {
    this.sndVls(
      "div-cht",
      this.lst_licensepredict,
      "License Plate Price",
      this.myChart_prm
    );
  },
  beforeUnmount() {
    this.ChkDsp(this.myChart);
  }, // destroy echarts' div when quit
};
</script>

<style scoped lang="scss">
.licenseprediction {
  padding: 0 5%;
  div.bnr {
    text-align: right;
    width: 100%;
    margin: 0 0 15px 0;
    .bnr_npt {
      height: 28px;
      input {
        outline-style: none;
        border: 0;
        margin: 0 0 0 3px;
        font-size: 12px;
        padding: 6px 3px;
        width: 10%;
        min-width: 80px;
        background-color: #f5f5f5;
      }
      input:hover {
        color: #f5f5f5;
        background-color: #c4d9a9;
      }
      #npt-btn {
        width: 8%;
        min-width: 50px;
      }
      #npt-btn:hover {
        cursor: pointer;
        background-color: #d1887e;
      }
      #npt-rld {
        color: #d1887e;
        width: 8%;
        min-width: 50px;
      }
      #npt-rld:hover {
        cursor: pointer;
        color: #f5f5f5;
        background-color: #6b2a22;
      }
    }
  } // 对第一部分输入栏的样式设置
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
