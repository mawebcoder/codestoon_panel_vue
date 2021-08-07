<template>
  <div>
    <main>

<!--      header-->
      <Header/>

      <article class="row">

<!--        side bar-->
        <div class="col-2">
          <Sidebar/>
        </div>

<!--        section-->
        <section class="col-10 col-768-12">
          <div style="margin: 10px 0">
            <md-toolbar style="display: flex;justify-content: center">
            <h3> {{$store.state.page_title}}  </h3>
            </md-toolbar>
          </div>
          <router-view></router-view>
        </section>

      </article>



<!--      footer-->
      <Footer/>

    </main>


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
article{
  min-height: 100px;
  margin-top: 7px;
}
section{
  background-color: rgba(174,180,170,0.09);
  padding: 20px;
}
</style>