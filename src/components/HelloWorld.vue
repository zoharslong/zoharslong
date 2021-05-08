<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
    <div class="ctt">
      <p>First of all, we need a self-introduction</p>
      <p>the owner of this website, Zoharslong has been certified as</p>
      <p>
        Project Management Professional - PMP - by<br />
        Project Management Institute
      </p>
      <p>
        Business Analysis Professional - CBAP - by<br />
        International Institute of Business Analysis
      </p>
      <p>
        Projects Data Analyst - CPDA - by<br />
        China Data Analysis Committee, China General Chamber Of Commerce
      </p>
      <p>
        Real Estate Valuer by<br />
        China Real Estate Valuers And Agents Association
      </p>
    </div>
    <div class="ctt">
      <p>Now he is preparing for PgMP, CFA and NASA-cpa</p>
    </div>
    <div class="ctt">
      <p>
        <a href="https://github.com/zoharslong/" target="_blank" rel="noopener"
          >GitHub</a
        >
        |
        <a
          href="https://blog.csdn.net/qq_39360343"
          target="_blank"
          rel="noopener"
          >CSDN</a
        >
        | Relative Links
      </p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "HelloWorld",
  props: { msg: String },
};
</script>

<style scoped lang="scss">
.hello {
  padding: 0 5%;
  .ctt {
    margin: 30px 0 0 0;
    text-align: right;
    p {
      font-size: 14px;
      a {
        color: #77a753;
      }
    }
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
