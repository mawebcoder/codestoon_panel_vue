<template>
  <div>
    <label>
      نام تگ به فارسی :
    </label>
    <md-field>
      <md-input v-model="fa_name"></md-input>
    </md-field>

    <label>
      نام تگ به انگلیسی :
    </label>
    <md-field>
      <md-input v-model="en_name"></md-input>
    </md-field>

    <label>
      اسلاگ :
    </label>
    <md-field>
      <md-input v-model="slug"></md-input>
    </md-field>

    <label>
      توضیحات متا :
    </label>
    <md-field>
      <md-input v-model="meta"></md-input>
    </md-field>

    <label>
      توضیحات کوتاه :
    </label>
    <md-field>
      <md-textarea v-model="short_description"></md-textarea>
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
import ArticleTagService from "../../../services/Article/ArticleTagService";
import HelperClass from "../../../services/HelperClass";

export default {
  name: "Create",
  data() {
    return {
      status: false,
      fa_name: "",
      en_name: "",
      slug: "",
      meta: "",
      short_description: "",
      show_in_filter: false,
    };
  },
  methods: {
    getData() {
      let formData = new FormData();
      formData.append("fa_name", this.fa_name);
      formData.append("status", this.status ? 1 : 0);
      formData.append("slug", this.slug);
      formData.append("meta", this.meta);

      this.short_description.trim().length
        ? formData.append("short_description", this.short_description)
        : "";
      this.en_name.trim().length
        ? formData.append("en_name", this.en_name)
        : "";
      formData.append("show_in_filter", this.show_in_filter ? 1 : 0);
      return formData;
    },
    makeEmptyValues() {
      this.fa_name = "";
      this.en_name = "";
      this.status = false;
      this.meta = "";
      this.short_description = "";
      this.show_in_filter = false;
      this.slug = "";
    },
    submit() {
      this.$store.state.loader = true;
      let data = this.getData();

      ArticleTagService.store(data)
        .then(() => {
          HelperClass.showSuccess(this.$noty);
          this.makeEmptyValues();
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },
    showScrollTop() {},
  },
  mounted() {},
};
</script>

<style scoped></style>
