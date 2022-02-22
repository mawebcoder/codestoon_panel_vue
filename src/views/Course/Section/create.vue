<template>
  <div>
    <label>
      عنوان فصل به فارسی :
    </label>
    <md-field>
      <md-input v-model="fa_name"></md-input>
    </md-field>
    <label>
      عنوان فصل به انگلیسی :
    </label>
    <md-field>
      <md-input
      
        v-model="en_name"
      ></md-input>
    </md-field>

<label>
  دوره مورد نظر را انتخاب کنید
</label>
    <multiselect
      style="margin-bottom: 20px"
      selectedLabel=" "
      selectLabel="انتخاب "
      deselectLabel="حذف"
      v-model="courseSelected"
      :options="courseArray"
      :close-on-select="true"
      :clear-on-select="false"
      :preserve-search="true"
      label="name"
      track-by="name"
    >
    </multiselect>

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
import HttpVerbs from "../../../services/HttpVerbs";
import HelperClass from "../../../services/HelperClass";

const multiselect = () => import("vue-multiselect");
export default {
  name: "Create",
  created() {
    this.getInfo();
  },
  data() {
    return {
      status: false,
      fa_name: "",
      en_name: "",
      courseSelected: null,
      courseArray: [],
    };
  },
  methods: {
    getInfo() {
      HttpVerbs.getRequest("courses/select/box")
        .then((res) => {
          let result = res.data.data;

          /**
           * refresh selectBox
           *
           * @type {null}
           */
          this.courseSelected = null;
          this.courseArray = [];

          this.setUpCategories(result);
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },
    setUpCategories(result) {
      result.forEach((item) => {
        this.courseArray.push({ name: item.title, value: item.id });
      });
      if (this.courseArray.length) {
        this.courseSelected = this.courseArray[0];
      }
    },
    getData() {
      let formData = new FormData();

      formData.append("title", this.fa_name);

      formData.append("status", this.status ? 1 : 0);

      this.en_name.trim().length
        ? formData.append("en_title", this.en_name)
        : "";

      if (this.courseSelected) {
        formData.append("course_id", this.courseSelected.value);
      }

      return formData;
    },
    makeEmptyValues() {
      this.fa_name = "";
      this.en_name = "";
      this.status = false;
      this.courseSelected = null;
    },
    submit() {
      let data = this.getData();
      HttpVerbs.postRequest(`courses/sections`, data)
        .then(() => {
          HelperClass.showSuccess(this.$noty);
          this.makeEmptyValues();
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },
  },
  components: {
    multiselect,
  },
};
</script>

<style scoped></style>
