<template>
  <header class="row">
    <!--    logo name -->
    <div class="col-2  logo-name">
    <img style="width:50%" src="@/assets/images/logo.png" alt="">
    </div>
    <!--    search box-->
    <div class="col-9 col-768-9 col-480-11 search-box" dir="rtl">

  
    </div>



  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      search: '',
      is_searching: false
    }
  },
  methods: {
    openAside() {
      let aside = document.querySelector('aside');
      let asideCloser = document.querySelector('.aside-closer');
      asideCloser.classList.remove('d-none')
      aside.style.transform = 'translateX(0)';
    },
    searchInPanel() {
      if (this.search.length === 0) {
        this.is_searching = false;
        return;
      }
      this.is_searching = true;
    },
    BlurSearchBox() {
      this.is_searching = false;
      this.search = '';
    }
  },
}
</script>

<style scoped lang="scss">
@import "../assets/variables";

header {
  height: 65px;
  background-color: #fff;
}

.logo-name {
  text-align: center;
  font-size: 1.5em;
  color: $sideBarFontColor;
  line-height: 58px;
}
.logo-name{
  border-left: 1px solid rgba(118, 122, 115, 0.3);
}
.hamburger-icon {
  line-height: 62px;
  text-align: left;
  border-left: 1px solid rgba(118, 122, 115, 0.3);

  i {
    cursor: pointer;
  }
}

.search-result {
  min-height: 100px;
  position: absolute;
  width: 100%;
  top: 54px;
  background: #fff;
  box-shadow: 0 0 5px rgba(112, 112, 112, 0.71);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

input {
  padding: 0 17px !important;
}

.search-box {
  position: relative;
  padding: 0 10px;
}

i {
  cursor: pointer;
}

</style>