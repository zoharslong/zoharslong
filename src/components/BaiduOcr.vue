<template>
  <div class="baiduocr">
    <h3>{{ msg }}</h3>
    <!-- 输入框样式 -->
    <div class="bnr">
      <div class="bnr_npt">
        <div style="display: inline-block; height: 28px">
          <label for="smp">Simple</label>
          <input
            type="radio"
            id="smp"
            class="npt_rdo"
            title="选择快速模式进行识别"
            name="rsl_typ"
            value="general"
            v-model="rsl_typ"
            checked
          />
          <label for="cpx">Complex</label>
          <input
            type="radio"
            id="cpx"
            class="npt_rdo"
            title="选择用时更长的精确模式进行识别，很贵，不要乱点"
            name="rsl_typ"
            value="accurate"
            v-model="rsl_typ"
          />
        </div>
        <input
          type="file"
          id="npt-fls"
          title="选择.jpg/.gif/.png格式的图片"
          accept="image/jpeg,image/gif,image/x-png"
          ref="inputer"
          @change="getPic()"
        />
        <input
          type="button"
          id="npt-btn"
          :value="vls_btn_npt[0]"
          :disabled="vls_btn_npt[1]"
          :title="vls_btn_npt[2]"
          @click="sndPic()"
        />
        <input
          type="button"
          id="npt-tns"
          :value="vls_btn_trn[0]"
          :disabled="vls_btn_trn[1]"
          :title="vls_btn_trn[2]"
          @click="trnPic()"
        />
      </div>
    </div>
    <!-- 内容样式 -->
    <div class="ctt">
      <table class="tbl_shw">
        <tr>
          <td>
            <div v-if="ldn_ocr === true">
              <LoadingPart msg="" />
            </div>
            <div v-else style="text-align: left">
              <p style="text-align: center">
                <!--eslint-disable-next-line-->
                <a v-if="rsl.words_result_num!==0">{{ rsl.words_result_num }} {{ rsl_nfo }}</a>
                <a v-else>{{ rsl_nfo }}</a>
              </p>
              <p>
                <!--eslint-disable-next-line-->
                <a v-for="(wrd) in rsl.words_result">{{ wrd.words }}</a>
              </p>
            </div>
          </td>
          <td style="vertical-align: top">
            <div class="ctt_prt">
              <div class="ctt_img">
                <img id="img-pre" alt="" :src="img_src" />
              </div>
            </div>
          </td>
        </tr>
      </table>
      <div class="ctt_rsl" v-if="shw_trn !== 'None'">
        <!--过度动画; 受到vue.shw_trn控制-->
        <table v-if="shw_trn === 'loading'">
          <tr>
            <LoadingPart msg="" />
          </tr>
        </table>
        <!--表格展示-->
        <table v-else-if="shw_trn === true">
          <!--eslint-disable-next-line-->
          <tr v-for="wrd in rsl.chr.rsl">
            <!--eslint-disable-next-line-->
            <td v-for="key in wrd">{{ key }}</td>
          </tr>
        </table>
        <!--文段展示-->
        <table v-else-if="shw_trn === false">
          <!--eslint-disable-next-line-->
          <p v-for="wrd in rsl.chr.rsl">
            <!--eslint-disable-next-line-->
            <a v-for="key in wrd">{{ key }}</a>
          </p>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import $ from "jquery";
import Fnc from "../assets/js/prm_fnc.js";
import LoadingPart from "@/components/LoadingPart.vue";

export default {
  name: "BaiduOcr",
  components: { LoadingPart },
  props: { msg: String }, // 在views层获得将变量带入components层的机会
  data() {
    return {
      ldn_ocr: false, // loadingPart for OCR
      shw_trn: "None", // final table of transpose, ["None","loading",true,false]
      rsl_nfo: "Waiting for inputting picture.", // for  info in first line of table
      vls_btn_npt: ["Send", true, "图片文字识别"], // for id='npt-btn', 存放及初始化识别按钮
      vls_btn_trn: ["Trans", true, "古文纵向排版文字翻转"],
      img_dts: {}, // 存放图片文件
      img_src: "", // 存放预览图片的src
      rsl_typ: "general", // result type in accurate or simple for baiduOCR
      rsl: { words_result_num: 0, words_result: [], chr: {} }, // 存放回传结果
      // format in {
      //   'msg':200/500,
      //   'log_id':str,
      //   'words_result':['words','location'],
      //   'chr':{'msg':200/500, 'typ':'raw'/'trn','rsl':[[],..]},
      //   'words_result_num': int,
      //   'error_code':int,
      //   'error_msg':str,
      // ]
    };
  },
  computed: {
    vip() {
      return this.$store.state.vip;
    }, // got value vuex.$store.state.vip
  },
  watch: {
    rsl_typ: function () {
      let pic_npt = this.$refs.inputer; // 检查是否已传入图片
      if (pic_npt.files.length !== 0) {
        this.vls_btn_npt = ["Send", false, "点击开始识别"];
      }
    }, // check rsl_typ for button available or not
  },
  methods: {
    getPic() {
      this.shw_trn = "None"; // 更换图片后关闭ctt_trn展示
      this.vls_btn_trn = ["Trans", true, "古文纵向排版文字翻转"];
      this.rsl = { words_result_num: 0, words_result: [], chr: {} };
      let pic_npt = this.$refs.inputer; // 将input中的图片存放于pic_npt.files[0];
      let createObjectURL = function (blob) {
        return window[window.webkitURL ? "webkitURL" : "URL"][
          "createObjectURL"
        ](blob);
      }; // 用于预览图片的src构建
      if (pic_npt.files.length !== 0) {
        this.img_src = createObjectURL(pic_npt.files[0]); // 指定<img src>实现图片预览
        this.img_dts = pic_npt.files[0]; // 保存图片
        this.vls_btn_npt = ["Send", false, "点击开始识别"]; // 获取图片后识别按钮可用
        this.rsl_nfo = "Waiting for sending."; // 获取图片后调整信息展示
      } else {
        this.img_src = "";
        this.img_dts = {};
        this.vls_btn_npt = ["Send", true, "需要先行选择图片"]; // 未获取图片时按钮禁用
        this.rsl_nfo = "Waiting for inputting picture."; // 未获取图片时调整信息展示
      } // 根据是否传入图片做相应的数据调整
    }, // 从<input type='file' ref="inputer">的change事件获取图片
    sndPic() {
      this.ldn_ocr = true; // 开始播放载入动画
      this.vls_btn_npt = ["Sending..", true, "识别中.."]; // 发送图片后识别按钮禁用
      this.vls_btn_trn = ["Trans", true, "等待数据.."];
      this.rsl_nfo = this.vls_btn_npt[0]; // 发送图片后调整信息展示
      let rdr_fls = new FileReader(); // FileReader可直接将上传文件转化为二进制流
      rdr_fls.readAsDataURL(this.img_dts); // 使用URL化将图片转化为二进制流，异步方法
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let vm = this; // 用于在匿名函数中反向为vm赋值
      rdr_fls.onload = function () {
        let vmm = vm; // 用于在匿名函数中反向为vm赋值
        $.post(
          "https://www.xzzsmeadow.com:5000/vue/baiduocr",
          // "http://127.0.0.1:5000/vue/baiduocr",
          { image: this.result, typ: vm.rsl_typ, vcd: vm.vip },
          function (got) {
            vmm.rsl = eval("(" + got + ")"); // 收到的文字识别结果存入vm
            vmm.ldn_ocr = false; // 关闭载入动画
            vmm.shw_trn = true; // 开启ctt_trn展示
            vmm.vls_btn_npt = ["Finished.", true, "识别完成"]; // 收信成功后调整按钮状态
            vmm.vls_btn_trn = ["Trans", false, "表格形式列转行"];
            vmm.rsl_nfo = "lines in the picture."; // 收信成功后调整信息展示
          }
        );
      };
    }, // 向服务器请求数据, 本地测试url为http://127.0.0.1
    trnPic() {
      if (this.rsl.chr !== {} && this.rsl.chr.typ === "raw") {
        let rsl_chr_rsl = this.rsl.chr.rsl; // 内容暂存
        this.rsl.chr.rsl = []; // 展示在table2的部分转为空
        this.vls_btn_trn = ["Trans..", true, "等待计算.."];
        this.shw_trn = "loading"; // 开始播放载入动画
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let vm = this;
        $.post(
          "https://www.xzzsmeadow.com:5000/vue/baiduocr",
          // "http://127.0.0.1:5000/vue/baiduocr",
          { trn: JSON.stringify(rsl_chr_rsl), vcd: this.vip },
          function (got) {
            vm.rsl.chr = eval("(" + got + ")"); // got in {'msg':200,'typ':'trn','rsl':[[],[],..]}
            vm.shw_trn = true; // 开启ctt_trn展示 shw_trn in ["None", true, false] for [关闭, 表格, 纯字]
            vm.vls_btn_trn = ["Trans", false, "表格形式列对调"];
          }
        ); // 传送位置信息并拼接成table
      } else if (this.rsl.chr !== {} && this.rsl.chr.typ === "trn") {
        this.rsl.chr.rsl = Fnc.fnc_trn(this.rsl.chr.rsl);
        this.shw_trn = true; // shw_trn in ["None", true, false] for [关闭, 表格, 纯字]
        this.rsl.chr.typ = "trned";
        this.vls_btn_trn[2] = "文本形式列转行";
      } else if (this.rsl.chr !== {} && this.rsl.chr.typ === "trned") {
        this.rsl.chr.rsl = Fnc.fnc_trn(this.rsl.chr.rsl);
        this.shw_trn = false;
        this.rsl.chr.typ = "word";
        this.vls_btn_trn[2] = "文本形式列对调";
      } else if (this.rsl.chr !== {} && this.rsl.chr.typ === "word") {
        this.rsl.chr.rsl = Fnc.fnc_trn(this.rsl.chr.rsl);
        this.shw_trn = false;
        this.rsl.chr.typ = "worded";
        this.vls_btn_trn[2] = "表格形式列转行";
      } else if (this.rsl.chr !== {} && this.rsl.chr.typ === "worded") {
        this.rsl.chr.rsl = Fnc.fnc_trn(this.rsl.chr.rsl);
        this.shw_trn = true;
        this.rsl.chr.typ = "trn";
        this.vls_btn_trn[2] = "表格形式列对调";
      }
    }, // transpose words in the pic
  },
};
</script>

<style scoped lang="scss">
.baiduocr {
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
        font-size: 14px;
        padding: 6px 0;
        width: 8%;
        min-width: 50px;
      }
      input:hover {
        cursor: text;
        color: #f5f5f5;
        background-color: #c4d9a9;
      }
      input.npt_rdo {
        vertical-align: middle;
        display: inline-block;
        margin: 0 9px 0 3px;
        width: 10px;
        min-width: 10px;
        height: 28px;
        text-align: left;
      }
      input.npt_rdo:hover {
        cursor: pointer;
      }
      label {
        line-height: 28px;
        height: 28px;
        top: 0;
        margin: auto;
        vertical-align: middle;
        display: inline-block;
        font-size: 12px;
      }
      #npt-fls {
        width: 30%;
        font-size: 12px;
        padding: 3px 0;
      }
      #npt-btn:hover {
        cursor: pointer;
        background-color: #d1887e;
      }
      #npt-tns:hover {
        cursor: pointer;
        background-color: #77a753;
      }
    }
  } // 对第一部分输入栏的样式设置
  div.ctt {
    text-align: right;
    width: 100%;
    div.ctt_rsl {
      margin: 15px 0;
      padding: 15px 0;
      box-shadow: 1px 2px 2px 2px #e0e0e0;
      -moz-box-shadow: 1px 2px 2px 2px #e0e0e0;
      -webkit-box-shadow: 1px 2px 2px 2px #e0e0e0;
    }
    table {
      border: 0;
      border-spacing: 0;
      margin: auto;
      tr {
        td {
          .ctt_prt {
            vertical-align: top;
            .ctt_img {
              height: 200px;
              #img-pre {
                max-height: 200px;
                min-width: 200px;
                max-width: 50%;
                overflow: hidden;
                object-fit: cover;
              }
            }
          }
        }
      }
      p {
        margin: 1px 0 1px 0;
        text-align: left;
      }
    }
    .tbl_shw {
      width: 100%;
    }
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
