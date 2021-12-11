<template>
  <div style="color: red">

    <!--    <json-viewer-->
    <!--        :value="data"-->
    <!--        :expand-depth=5-->
    <!--        copyable-->
    <!--        boxed-->
    <!--        sort-->
    <!--    ></json-viewer>-->

    <search-component></search-component>
  </div>
</template>

<script>
// import jsonViewer from 'vue-json-viewer'
import SearchComponent from "../components/SearchComponent";

export default {
  created() {

  },
  data() {
    return {}
  },
  methods: {

    // defineDynamicProps() {
    //   return {
    //     name: 'mohammad'
    //   }
    // }
  },
  components: {
    // jsonViewer
    SearchComponent
  }
}
</script>