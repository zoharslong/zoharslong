import logo01 from "../img/logo01.gif"; // img size 120*90px
import logo02 from "../img/logo02.gif"; // 限于相对地址, 需要将图片导入

const clr_bsc = {
  "010": "#D1887E", // 红 - 主色
  "011": "#6B2A22", // 深红 - 异常提示
  "012": "#863E34", // 对比深红 - 主色的深对比
  "013": "#A75B51",
  "017": "#DAA199",
  "018": "#E1B2AC", // 对比浅红 - 主色的浅对比
  "019": "#E7C0BC", // 浅红
  "020": "#349E98", // 蓝绿
  "030": "#204837", // 深绿
  "040": "#77A753", // 中绿
  "050": "#C4D9A9", // 浅绿
  990: "#000000", // 黑
  991: "#212121",
  992: "#424242",
  993: "#616161",
  994: "#757575",
  995: "#9E9E9E",
  996: "#BDBDBD",
  997: "#E0E0E0",
  998: "#EEEEEE",
  999: "#F5F5F5", // 灰
  0: "#ffffff", // 白
}; // 字体颜色992, 底色997, input底色998, echarts中使用993、998
const clr_bmp = [
  {
    featureType: "land", //调整土地颜色
    elementType: "geometry",
    stylers: { color: "#f3f3f3" },
  },
  {
    featureType: "building", //调整建筑物颜色
    elementType: "geometry",
    stylers: { color: "#04406F", visibility: "off" },
  },
  {
    featureType: "building", //调整建筑物标签是否可视
    elementType: "labels",
    stylers: { visibility: "off" },
  },
  {
    featureType: "highway", //调整高速道路颜色
    elementType: "geometry",
    stylers: { color: "#fdfdfd" },
  },
  {
    featureType: "highway", //调整高速名字是否可视
    elementType: "labels",
    stylers: { visibility: "off" },
  },
  {
    featureType: "arterial", //调整一些干道颜色
    elementType: "geometry",
    stylers: { color: "#fefefe" },
  },
  {
    featureType: "arterial",
    elementType: "labels",
    stylers: { visibility: "off" },
  },
  {
    featureType: "green", //绿地
    elementType: "geometry",
    stylers: { color: "#E6E6E6" },
  },
  {
    featureType: "water", //水体
    elementType: "geometry",
    stylers: { color: "#d1d1d1" },
  },
  {
    featureType: "subway", //地铁
    elementType: "geometry.stroke",
    stylers: { color: "#fdfdfd" },
  },
  {
    featureType: "subway",
    elementType: "labels",
    stylers: { visibility: "off" },
  },
  {
    featureType: "railway", //铁路
    elementType: "geometry",
    stylers: { visibility: "off" },
  },
  {
    featureType: "railway",
    elementType: "labels",
    stylers: { visibility: "off" },
  },
  {
    featureType: "all", //调整所有的标签的边缘颜色
    elementType: "labels.text.stroke",
    stylers: { color: "#313131", visibility: "off" },
  },
  {
    featureType: "all", //调整所有标签的填充颜色
    elementType: "labels.text.fill",
    stylers: { color: "#FFFFFF", visibility: "off" },
  },
  {
    featureType: "manmade",
    elementType: "geometry",
    stylers: { visibility: "off" },
  },
  {
    featureType: "manmade",
    elementType: "labels",
    stylers: { visibility: "off" },
  },
  {
    featureType: "subway", //地铁色差
    elementType: "geometry",
    stylers: { lightness: 85 },
  },
  {
    featureType: "railway", //铁路色差
    elementType: "all",
    stylers: { lightness: 60 },
  },
  {
    featureType: "boundary", //边界色差
    elementType: "geometry",
    stylers: { color: "#8b8787", weight: "1", lightness: 40 },
  },
  {
    featureType: "local",
    elementType: "geometry",
    stylers: { visibility: "off" },
  },
  {
    featureType: "local",
    elementType: "labels",
    stylers: { visibility: "off" },
  },
]; // 百度地图css格式
const css_scp = {
  "berder-left-width": "2px",
  "border-left-style": "solid",
  "border-left-color": clr_bsc["992"],
  "background-color": clr_bsc["992"],
  color: clr_bsc["998"],
}; // script代码块上级div的css, 与SideContent中的css相互配合
const css_tag = {
  "berder-left-width": "2px",
  "border-left-style": "solid",
  "border-left-color": clr_bsc["050"],
  "font-size": "14px",
  "word-wrap": "break-word",
  "word-break": "break-all",
}; // tags备注上级div的css
const css_cmm = {
  "berder-left-width": "2px",
  "border-left-style": "solid",
  "border-left-color": clr_bsc[0],
}; // common常规上级div的css
const img_bsc = {
  "01": logo01,
  "02": logo02,
}; // 图片调用字典

export default {
  clr_bsc, // 基础配色表
  clr_bmp, // 百度地图配色表
  css_cmm, // 文本内容的css
  css_scp, // 文本内容下代码块的css
  css_tag, // 本文内容下备注的css
  img_bsc, // 图片调用字典
};
