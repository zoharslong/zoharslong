/* eslint-disable */
import ccs_prm from "../../../public/dts/prm_css.js";

const chr_yxs = [
  ccs_prm.clr_bsc["993"],
  ccs_prm.clr_bsc["993"],
  ccs_prm.clr_bsc["993"],
  ccs_prm.clr_bsc["993"],
]; // 用于y轴基线的配色
const ptn_ech = {
  title: {
    show: true,
    x: "center",
    textStyle: { color: chr_yxs[0], fontWeight: "lighter" },
  },
  grid: { top: "20%", left: "12%", right: "12%" }, // 本次无y2坐标轴因此放弃右侧位置调整 default {top:'20%',left:'12%', right:'12%',}
  legend: { type: "scroll", x: "center", y: "top", top: "8%" }, // selected: {},
  tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
  toolbox: {
    orient: "horizontal",
    x: "right",
    y: "top",
    feature: {
      magicType: { type: ["line", "bar", "stack", "tiled"] }, // ["line", "bar", "stack", "tiled"]
      restore: { show: true },
      dataView: { show: true, readOnly: false },
      saveAsImage: { show: true },
    },
  },
  dataZoom: [
    { show: true, realtime: true },
    { type: "inside", realtime: true },
  ],
  xAxis: [
    {
      type: "category",
      splitLine: { show: false }, // 网格线不显示
      axisLine: { onZero: true, lineStyle: { color: chr_yxs[0] } }, // x:横轴配色
      axisTick: { show: false, alignWithLabel: false },
      boundaryGap: false,
    },
  ],
}; // 柱线图中恒定参数
function fnc_gnr_yxs(dct_prm_yxs) {
  let yAxsrs = [];
  for (let j = 0; j < dct_prm_yxs.yAxNms.length; j++) {
    let cll_yAx = {
      type: "value",
      name: dct_prm_yxs.yAxNms[j],
      offset: 30,
      position: "right",
      min: "dataMin", // 动态最小值
      splitNumber: 6,
      splitLine: { show: false }, // 网格线不显示
      axisLine: { onZero: true, lineStyle: { color: chr_yxs[j] } }, // y_right_1: 纵轴零线配色
      axisTick: { show: false, alignWithLabel: false },
      axisLabel: { formatter: "{value}" },
    };
    if (j === 0) {
      cll_yAx["splitLine"] = {
        show: true,
        interval: "2",
        lineStyle: { color: ccs_prm.clr_bsc["998"] },
      };
      cll_yAx["position"] = "left";
    }
    yAxsrs.push(cll_yAx);
  } // 构造针对不同y轴的样式要求
  return yAxsrs;
} // 生成纵轴参数字典
function fnc_gnr_lgd(dct_prm_lgd, typ = "") {
  let lgd_srs = [];
  for (let i = 0; i < dct_prm_lgd.lgdTyp.length; i++) {
    let dct_i = {
      yAxisIndex: dct_prm_lgd.lgdAxs[i], // yAxis of this unit
      type: dct_prm_lgd.lgdTyp[i], // type in ['bar','line','scatter']
      stack: dct_prm_lgd.lgdStk[i], // 堆叠图:声明本元素所属的堆叠组, 非堆叠则注销
      barWidth: dct_prm_lgd.barWdh,
      showAllSymbol: true,
      itemStyle: { color: dct_prm_lgd.lgdClr[i] }, // color of this type unit
      lineStyle: { width: 1.5, type: dct_prm_lgd.lgdLns[i] }, // type in [solid, dashed, dotted]
    };
    if (typ === "area") {
      let dct_mrg = {
        areaStyle: {
          origin: "auto",
          shadowBlur: 5,
          opacity: 0.1, // 着色方式['auto','start','end'], 着色透明图[0,1], 阴影大小
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            global: false, // default false means relative location
            colorStops: [
              { offset: 0, color: dct_prm_lgd.lgdClr[i] },
              { offset: 1, color: ccs_prm.clr_bsc["999"] },
            ],
          }, // 渐变着色规则
        }, // 折线下方区域的着色
      };
      Object.assign(dct_i, dct_mrg);
    }
    lgd_srs.push(dct_i);
  } // 构造针对不同数据列的样式要求
  return lgd_srs;
} // 生成数据参数字典

export default {
  ptn_ech,
  fnc_gnr_yxs, // 用于缩减echarts.option的深度合并
  fnc_gnr_lgd,
};
