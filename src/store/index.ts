import { createStore } from "vuex";
import $ from "jquery";
import * as echarts from "echarts/core";
import { LineChart, BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import {
  TitleComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  ToolboxComponent,
  DataZoomComponent,
  MarkLineComponent,
  DatasetComponent,
} from "echarts/components"; // CanvasRenderer: 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
// 在echarts样例页可以查看各种图所需的组件
// let echarts = require('echarts/lib/echarts'); https://blog.csdn.net/qq_35567179/article/details/110734722

echarts.use([
  TitleComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  ToolboxComponent,
  DataZoomComponent,
  MarkLineComponent,
  DatasetComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
]); // 注册必须的组件

export default createStore({
  state: {
    tck: 0, // 公用计时器
    ect: echarts, // 未实例化、最小导入的echarts类
    vip: "", // vipCode
    usa: "", // UserAgent for visiting logs
    usa_msg: { msg: 0, nfo: "ready" }, // communicate with service in every page, may change when fnc_usa_snd
  }, // 状态记录, 在调用时需要于内容页借助compute.return
  mutations: {
    fnc_tck_nit(state) {
      function fnc_cnt() {
        state.tck += 1;
      } // 计时函数
      if (state.tck === 0) {
        setInterval(fnc_cnt, 1000);
      } // 计时器本体
    }, // 初始化计时器
    fnc_usa_nit(state) {
      if (state.usa === "" || state.usa !== navigator.userAgent) {
        state.usa = navigator.userAgent;
      }
    }, // 用户设备信息初始化
    fnc_usa_snd(state, obj_mpt) {
      if (state.usa !== "") {
        state.usa_msg = { msg: 500, nfo: "sorryIDead" };
        $.post(
          "https://www.xzzsmeadow.com:5000/vue/log", // "http://127.0.0.1:5000/vue/log",
          obj_mpt,
          function (got) {
            state.usa_msg = eval("(" + got + ")");
          } // 收到的连接日志反馈结果存入vm, 为了同一格式, 转化为object对象
        );
      }
    }, // 发送访问日志
    fnc_vip(state, str_mpt) {
      state.vip = str_mpt;
    }, // VIPCode赋值
  },
  actions: {
    fnc_tck_act(context) {
      context.commit("fnc_tck_nit");
    },
    fnc_usa_act(context) {
      context.commit("fnc_usa_nit");
      const usa_log = {
        url: window.location.href,
        usa: context.state.usa,
        tck: context.state.tck,
        tms: new Date(Date.now()),
      };
      context.commit("fnc_usa_snd", usa_log);
    },
  },
  modules: {},
});
