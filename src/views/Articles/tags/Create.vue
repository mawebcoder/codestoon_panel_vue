<template>
  <div>

    <md-field>

      <md-input placeholder="نام تگ به فارسی..." v-model="fa_name"></md-input>
    </md-field>

    <md-field>

      <md-input placeholder="نام تگ به انگلیسی..." v-model="en_name"></md-input>
    </md-field>

    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>

  </div>
</template>

<script>
import ArticleTagService from "../../../services/Article/ArticleTagService";

export default {
  name: "Create",
  created() {
    this.$store.state.page_title = 'ایجاد تگ مقالات';
  },
  data() {
    return {
      status: false,
      fa_name: '',
      en_name: ''
    }
  },
  methods: {
    getData() {
      let formData = new FormData();
      formData.append('name', this.name);
      formData.append('status', this.status ? 1 : 0);
      this.en_name.trim().length ?
          formData.append('en_name', this.en_name) :
          '';
      return formData;
    },
    submit() {

      let data = this.getData();

      ArticleTagService.store(data)


    }
  }
}
</script>

<style scoped>

</style>