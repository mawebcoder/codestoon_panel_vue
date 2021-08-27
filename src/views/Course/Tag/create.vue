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
      fa_name: '',
      en_name: '',
      slug: "",
      meta: "",
      short_description: '',
    }
  },
  methods: {
    getData() {
      let formData = new FormData();
      formData.append('fa_title', this.fa_name);
      formData.append('en_title', this.en_name);
      formData.append('status', this.status ? 1 : 0);
      formData.append('slug', this.slug );
      formData.append('meta', this.meta);

      this.short_description.trim().length?
          formData.append('short_description',this.short_description):'';
      return formData;
    },
    makeEmptyValues() {
      this.fa_name = '';
      this.en_name = '';
      this.status = false;
      this.meta='';
      this.short_description='';
      this.slug='';
    },
    submit() {
      this.$store.state.loader = true;
      let data = this.getData();

      CourseTagService.store(data)
          .then(() => {
            HelperClass.showSuccess(this.$noty)
            this.makeEmptyValues();
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })

    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>