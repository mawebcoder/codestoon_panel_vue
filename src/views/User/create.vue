<template>
  <div>

    <md-field>

      <md-input placeholder="نام کاربر..." v-model="fa_name"></md-input>
    </md-field>
    <label>
      نقش کاربر :
    </label>
    <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="sort"
                 :options="sortOptions" :close-on-select="true"
                 :clear-on-select="false"
                 :preserve-search="true" placeholder="نقش کاربر را انتخاب کنید..." label="name"
                 track-by="name">
    </multiselect>
    <md-field>


      <md-input placeholder="ایمیل..." v-model="en_name"></md-input>
    </md-field>

    <md-field>

      <md-input placeholder="شماره تلفن..." v-model="en_name"></md-input>
    </md-field>

    <md-field>

      <md-input placeholder="رمز عبور..." v-model="en_name"></md-input>
    </md-field>

    <md-field>

      <md-input placeholder="تکرار رمز عبور..." v-model="en_name"></md-input>
    </md-field>

    <md-field>

      <md-file accept="video/mp4" placeholder="برای آپلود عکس پروفایل کلیک کنید..." @change="uploadit($event)" v-model="single" />

    </md-field>

    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>

  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  name: "Create",
  data() {
    return {
      status: false,
      fa_name: '',
      en_name: '',
      sortOptions: [
        {name: 'جدیدترین', value: 1},
        {name: 'قدیمی ترین', value: 0},
      ],
      sort: {name: 'جدیدترین', value: 1},
    }
  },
  components: {
    Multiselect
  },
  methods: {
    getData() {
    },
    makeEmptyValues() {
      this.fa_name = '';
      this.en_name = '';
      this.status = false;
    },
    submit() {

    },
    showScrollTop() {


    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>