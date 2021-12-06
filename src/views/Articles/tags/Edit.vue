<template>
  <div>

    <md-field>

      <md-input placeholder="نام تگ به فارسی..." v-model="fa_name"></md-input>
    </md-field>

    <md-field>

      <md-input placeholder="نام تگ به انگلیسی..." v-model="en_name"></md-input>
    </md-field>

    <md-field>

      <md-input placeholder="اسلاگ..." v-model="slug"></md-input>
    </md-field>

    <md-field>

      <md-input placeholder="توضیحات متا..." v-model="meta"></md-input>
    </md-field>

    <md-field>

      <md-textarea placeholder="توضیحات کوتاه..." v-model="short_description"></md-textarea>
    </md-field>

    <label>
      نمایش در فیلتر :
    </label>
    <div dir="ltr">
      <md-switch v-model="show_in_filter"></md-switch>
    </div>

    <label>
      وضعیت :
    </label>

    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>

  </div>
</template>

<script>
import HelperClass from "../../../services/HelperClass";
import HttpVerbs from "../../../services/HttpVerbs";

export default {
  name: "Edit",
  created() {
    this.getInfo()
  },
  data() {
    return {
      status: false,
      fa_name: '',
      en_name: '',
      slug: "",
      meta: "",
      short_description: '',
      show_in_filter: false,
    }
  },
  methods: {
    getInfo() {
      HttpVerbs.getRequest(`articles/tags/edit/${this.$route.params.id}`)
          .then(res => {
            let result = res.data.data;
            this.fa_name = result.fa_name;
            this.en_name = result.en_name;
            this.show_in_filter = result.show_in_filter === 1;
            this.short_description = result.short_description;
            this.status = result.status === 1;
            this.meta = result.meta;
            this.slug = result.slug;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getData() {
      let formData = new FormData();
      formData.append('fa_name', this.fa_name);
      formData.append('status', this.status ? 1 : 0);
      formData.append('slug', this.slug);
      formData.append('meta', this.meta);

      this.short_description.trim().length ?
          formData.append('short_description', this.short_description) : '';
      this.en_name.trim().length ?
          formData.append('en_name', this.en_name) :
          '';
      formData.append('show_in_filter', this.show_in_filter ? 1 : 0);
      return formData;
    },
    submit() {
      this.$store.state.loader = true;
      let data = this.getData();
      HttpVerbs.putRequest(`articles/tags/${this.$route.params.id}`, data)
          .then(() => {
            HelperClass.showSuccess(this.$noty);
            close()
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })

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