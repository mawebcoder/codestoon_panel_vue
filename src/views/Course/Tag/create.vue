<template>
  <div>
    <label>
      نام تگ به فارسی :
    </label>
    <md-field>
      <md-input  v-model="fa_name"></md-input>
    </md-field>

    <label>
      نام تگ به انگلیسی :
    </label>
    <md-field>
      <md-input style="direction:ltr;padding:0 10px" v-model="en_name"></md-input>
    </md-field>

    <label>
      اسلاگ :
    </label>
    <md-field>
      <md-input  v-model="slug"></md-input>
    </md-field>

    <label>
      توضیحات متا:
    </label>
    <md-field>
      <md-input  v-model="meta"></md-input>
    </md-field>

    <label>
      توضیحات کوتاه :
    </label>
    <md-field>
      <md-textarea
      
        v-model="short_description"
      ></md-textarea>
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
import CourseTagService from "../../../services/Course/CourseTagService";
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
      formData.append("fa_title", this.fa_name);
      formData.append("en_title", this.en_name);
      formData.append("status", this.status ? 1 : 0);
      formData.append("slug", this.slug);
      formData.append("meta", this.meta);
      formData.append("show_in_filter", this.show_in_filter ? 1 : 0);

      this.short_description.trim().length
        ? formData.append("short_description", this.short_description)
        : "";
      return formData;
    },
    makeEmptyValues() {
      this.fa_name = "";
      this.en_name = "";
      this.status = false;
      this.meta = "";
      this.short_description = "";
      this.slug = "";
    },
    submit() {
      this.$store.state.loader = true;
      let data = this.getData();

      CourseTagService.store(data)
        .then(() => {
          HelperClass.showSuccess(this.$noty);
          this.makeEmptyValues();
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
