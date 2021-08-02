<template>
  <div>

    <Sidebar/>

    <router-view></router-view>

    <Footer/>

  </div>
</template>

<script>

export default {
  name: "Panel",
  components:{
    Sidebar:()=>import('../layouts/Sidebar'),
    Footer:()=>import('../layouts/Footer')
  }
}
</script>

<style scoped>

</style>