<template>
  <div>

    <md-field>

      <md-input placeholder="عنوان سوال..." v-model="title"></md-input>
    </md-field>

    <md-field>

      <md-textarea placeholder="پاسخ..." v-model="content"></md-textarea>
    </md-field>


    <div class="form-group">
      <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="course_id"
                   :options="courseArray" :close-on-select="true"
                   :clear-on-select="false"
                   :preserve-search="true" placeholder="دوره مورد نظر را انتخاب کنید..." label="name"
                   track-by="name">
      </multiselect>
    </div>


    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>

  </div>
</template>

<script>
import HelperClass from "../../services/HelperClass";
import HttpVerbs from "../../services/HttpVerbs";

const Multiselect = () => import('vue-multiselect')

export default {
  name: "Create",
  created() {
    this.getCourses();
  },
  data() {
    return {
      status: false,
      title: '',
      content: '',
      course_id: null,
      courseArray: [],
    }
  },
  methods: {
    getInfo() {
      HttpVerbs.getRequest(`faqs/${this.$route.params.id}/edit`)
          .then(res => {
            let result = res.data.data;
            this.title = result.title
            this.content = result.content;
            this.status = result.status === 1

            this.courseArray.forEach(item => {
              if (item.value === result.course_id) {
                this.course_id = item
              }
            })

          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getCourses() {
      HttpVerbs.getRequest('courses/select/box')
          .then(res => {
            let result = res.data.data;
            this.courseArray = [];
            if (result.status === 204) {
              return;
            }
            result.forEach(item => {
              this.courseArray.push({
                value: item.id,
                name: item.title
              })
            })
            this.getInfo();
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getData() {

      let formData = new FormData();
      formData.append('title', this.title);
      formData.append('content', this.content);
      formData.append('status', this.status ? 1 : 0);

      if (this.course_id) {
        formData.append('course_id', this.course_id.value)
      }
      return formData;
    },
    makeEmptyValues() {
      this.title = '';
      this.content = '';
      this.course_id = null;
      this.status = false;
    },
    submit() {
      let data = this.getData();
      HttpVerbs.putRequest(`faqs/${this.$route.params.id}`, data)
          .then(() => {
            HelperClass.showSuccess(this.$noty)
            close();
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
  },
  components: {
    Multiselect
  }
}
</script>

<style scoped>

</style>