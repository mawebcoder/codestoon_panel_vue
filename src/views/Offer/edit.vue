<template>
  <div>
    <label>
      نام :
    </label>

    <md-field>
      <md-input disabled="true" v-model="first_name"></md-input>
    </md-field>

    <label>
      نام خانوادگی :
    </label>
    <md-field>
      <md-input disabled="true" v-model="last_name"></md-input>
    </md-field>

    <label>
      عنوان:
    </label>
    <md-field>
      <md-input disabled="true" v-model="title"></md-input>
    </md-field>

    <label>
      ایمیل :
    </label>
    <md-field>
      <md-input disabled="true" v-model="email"></md-input>
    </md-field>

    <label>
      شماره تلفن :
    </label>

    <md-field>
      <md-input disabled="true" v-model="cell"></md-input>
    </md-field>
    <label>
      متن :
    </label>
    <editor
      disabled="true"
      v-model="content"
      api-key="214siyv4hmul2xqvhali31m8ox5kxrskd3g1k5b6an2ft09l"
      :init="{
        menubar: true,
        language: 'fa',
        plugins: [
          'advlist directionality codesample autolink link image lists charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
          'table emoticons template paste help',
        ],
        width: 1000,
        height: 300,
        images_upload_url: $store.state.baseUrl + 'editor/upload',

        toolbar:
          'undo redo | styleselect | codesample | bold italic | alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | link image | print preview media fullpage | ' +
          'forecolor backcolor emoticons | help | rtl ltr',
      }"
    />

    <label>
      وضعیت مشاهده :
    </label>
    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>
    
    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

import HelperClass from "../../services/HelperClass";
import HttpVerbs from "../../services/HttpVerbs";

export default {
  name: "Edit",
  created() {
    this.getInfo();
  },
  data() {
    return {
      status: false,
      email: "",
      cell: "",
      content: "",
      title: "",
      first_name: "",
      last_name: "",
    };
  },
  methods: {
    getInfo() {
      HttpVerbs.getRequest(`contacts/${this.$route.params.id}/edit`)
        .then((res) => {
          let data = res.data.data;

          this.setIncomeData(data);
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },

    setIncomeData(data) {
      this.title = data.title;
      this.email = data.email;
      this.cell = data.cell;
      this.content = data.content;
      this.status = data.status == 1;
      this.last_name = data.last_name;
      this.first_name = data.name;
    },

    getData() {
      let formData = new FormData();
      formData.append('status',this.status?1:0);

      return formData;
    },
    submit() {
      this.$store.state.loader = true;
      let data = this.getData();
      HttpVerbs.putRequest(`contacts/${this.$route.params.id}`, data)
        .then(() => {
          HelperClass.showSuccess(this.$noty);
          close();
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },
    showScrollTop() {},
  },
  components: {
    Editor,
  },
  mounted() {},
};
</script>

<style scoped></style>
