<template>
  <div>
    <Header/>

    <Sidebar/>

    <router-view></router-view>

    <Footer/>

  </div>
</template>

<script>

export default {
  name: "Panel",
  components: {
    Sidebar: () => import('../layouts/Sidebar'),
    Footer: () => import('../layouts/Footer'),
    Header: () => import('../layouts/Header')
  }
}
</script>

<style scoped>

</style>