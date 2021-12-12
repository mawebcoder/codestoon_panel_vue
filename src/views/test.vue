<template>
  <div style="color: red">

    <!--    <json-viewer-->
    <!--        :value="data"-->
    <!--        :expand-depth=5-->
    <!--        copyable-->
    <!--        boxed-->
    <!--        sort-->
    <!--    ></json-viewer>-->


  </div>
</template>

<script>
// import jsonViewer from 'vue-json-viewer'


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
  mounted() {
    let name = {
      name: 'mohammad',
      value: 'amiri'
    }
    for (let i in name) {
      console.log(name[i])
    }
  },
  components: {
    // jsonViewer
  }
}
</script>