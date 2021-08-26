<template>
  <div>

    <md-field>

      <md-input placeholder="نام دسته بندی به فارسی..." v-model="fa_name"></md-input>
    </md-field>

    <md-field>

      <md-input placeholder="نام دسته بندی به انگلیسی..." v-model="en_name"></md-input>
    </md-field>
    <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="parentObject"
                 :options="parentArray" :close-on-select="true"
                 :clear-on-select="false"
                 :preserve-search="true" placeholder=" دسته والد مورد نظر را در صورت وجود انتخاب کنید..." label="name"
                 track-by="name">
    </multiselect>


    <UploadImage valid_formats_text="صرفا فرمت ها jpg-jpeg-png-gif-svg قابل قبول است" title="آپلود کاور دسته بندی"
                 file_name="file"/>

    <label>
      : وضعیت
    </label>
    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>
    <label>
      نمایش در فیلترها :
    </label>
    <div dir="ltr">
      <md-switch v-model="show_in_filter"></md-switch>
    </div>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>

  </div>
</template>

<script>
import HelperClass from "../../../services/HelperClass";
import Multiselect from 'vue-multiselect'
import UploadImage from "../../../components/UploadImage";
import ArticleCategoryService from "../../../services/Article/ArticleCategoryService";

export default {
  name: "Create",
  created() {
    this.getSelectBox();
  },
  data() {
    return {
      parentObject: {name: 'بدون دسته والد', value: 0},
      status: false,
      fa_name: '',
      en_name: '',
      show_in_filter:false,
      parentArray: [
        {name: 'بدون دسته والد', value: 0},
      ],
    }
  },
  methods: {
    getSelectBox() {
      ArticleCategoryService.getParents()
          .then(res => {
            if (res.status === 204) {
              return;
            }
            let data = res.data.data;

            data.forEach(item => {

              this.parentArray.push({
                name: item.fa_name,
                value: item.id
              })

            })


          }).catch(error => {

        HelperClass.showErrors(error, this.$noty)

      });
    },

    getData() {
      let formData = new FormData();
      formData.append('fa_name', this.fa_name);
      this.en_name.trim().length ?
          formData.append('en_name', this.en_name) : '';
      formData.append('status', this.status ? 1 : 0);
      formData.append('show_in_filter', this.show_in_filter ? 1 : 0);



      if (this.parentObject) {

        if (parseInt(this.parentObject.value) !== 0) {
          formData.append('parent', this.parentObject.value)
        }
      }
      typeof (this.$store.state.image_file.file) !== 'undefined' ?
          formData.append('file', this.$store.state.image_file.file) : '';
      return formData;

    },
    submit() {

      this.$store.state.loader=true;

      let data = this.getData();
      ArticleCategoryService.store(data)
          .then(() => {
            HelperClass.showSuccess(this.$noty);
            delete this.$store.state.image_file.file
            this.$router.push({name:'category-article-list'})
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty);
      })

    },

    showScrollTop() {

    }
  },
  components: {
    Multiselect,
    UploadImage
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>