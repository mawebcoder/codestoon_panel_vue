<template>
  <header class="row">
    <!--    logo name -->
    <div class="col-1 logo-name">
      کدستوون
    </div>

    <!--    hamburger icon-->
    <div class="col-1 hamburger-icon">
      <md-icon>menu</md-icon>
      .
    </div>


    <!--    search box-->
    <div class="col-9 search-box" dir="rtl">

      <md-field>
        <md-input @blur="BlurSearchBox()" placeholder="جستجو در صفحات..." @keyup="searchInPanel()"
                  v-model="search"></md-input>
        <md-icon>search</md-icon>
      </md-field>

      <div :class="['search-result',is_searching?'d-block':'d-none']">

      </div>


    </div>


    <!--    profile icon-->
    <div class="col-1 position-relative d-flex justify-content-center align-items-center">

      <md-badge md-content="1">
        <md-button class="md-icon-button">
          <md-icon>notifications</md-icon>
        </md-button>
      </md-badge>

      <md-badge md-content="1">
        <md-button class="md-icon-button">
          <md-icon>
            account_circle
          </md-icon>
        </md-button>
      </md-badge>


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
  }
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

.hamburger-icon {
  line-height: 62px;
  text-align: left;
  border-left: 1px solid rgba(118,122,115,0.3);

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
i{
  cursor: pointer;
}

</style>