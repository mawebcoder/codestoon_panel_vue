<template>
  <div id="app">
    <div class="loader-box" v-if="$store.state.loader">
      <div style="transform: scale(0.3)">
        <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {}
  },

}
</script>

<style lang="scss">

html{
  scroll-behavior: smooth;
}
.loader-box {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(244, 242, 231, 0.5);
  justify-content: center;
  align-content: center;

  > div {
    width: 100%;
    text-align: center;
    line-height: 50;
    height: 100%;
  }
}

.md-switch-container {
  direction: ltr !important;
}

.vgt-global-search, .vgt-clearfix {
  flex-direction: column-reverse;
}
.router-link-exact-active{
  color: rgba(248, 22, 12, 0.77) !important;
}

</style>
