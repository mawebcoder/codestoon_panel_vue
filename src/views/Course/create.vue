<template>
  <div>

    <md-field>

      <md-input placeholder="نام دوره به فارسی..." v-model="title"></md-input>
    </md-field>

    <md-field>
      <md-input placeholder="نام دوره به انگلیسی..." v-model="en_title"></md-input>
    </md-field>

    <md-field>
      <md-input placeholder="اسلاگ..." v-model="slug"></md-input>
    </md-field>

    <div class="form-group">
      <md-field>
        <label>اطلاعات متا...</label>
        <md-textarea v-model="meta"></md-textarea>
      </md-field>
    </div>

    <div class="form-group">
      <md-field>
        <label>توضیحات کوتاه...</label>
        <md-textarea v-model="short_description"></md-textarea>
      </md-field>
    </div>

    <label>
      توضیحات کامل :
    </label>
    <editor
        v-model="description"
        api-key="214siyv4hmul2xqvhali31m8ox5kxrskd3g1k5b6an2ft09l"
        :init="{
                menubar: true,
                language:'fa',
                plugins: [
                'advlist directionality codesample autolink link image lists charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                'table emoticons template paste help'
                 ],
                width: 1000,
                height: 300,
                images_upload_url:$store.state.baseUrl+'/api/articles/upload-article-images',
                // image_upload_base_path:$store.state.baseUrl,
                toolbar: 'undo redo | styleselect | codesample | bold italic | alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | link image | print preview media fullpage | ' +
                'forecolor backcolor emoticons | help | rtl ltr',
                 }"
    />

    <md-field>

      <md-input @keydown="validateNumber($event)" type="number" placeholder="قیمت..." v-model="price"></md-input>
    </md-field>


    <md-field>

      <md-input @keyup="validateDiscount($event)" @keydown="validateNumber($event)" type="number"
                placeholder="درصد تخفیف..." v-model="percent"></md-input>
    </md-field>


    <div class="form-group">
      <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="level"
                   :options="levelArray" :close-on-select="true"
                   :clear-on-select="false"
                   :preserve-search="true" placeholder="سطح دوره را انتخاب کنید..." label="name"
                   track-by="name">
      </multiselect>
    </div>


    <div class="form-group">
      <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="category"
                   :options="categoryArray" :close-on-select="true"
                   :clear-on-select="false"
                   :preserve-search="true" placeholder="دسته بندی مورد نظر را انتخاب کنید..." label="name"
                   track-by="name">
      </multiselect>
    </div>


    <div class="form-group">

      <multiselect :multiple="true" selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="tags"
                   :options="tagsArray" :close-on-select="true"
                   :clear-on-select="false"
                   :preserve-search="true" placeholder="تگ های مورد نظر را انتخاب کنید..." label="name"
                   track-by="name">
      </multiselect>
    </div>

    <div class="form-group">

      <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="recording_status"
                   :options="recordingStatusArray" :close-on-select="true"
                   :clear-on-select="false"
                   :preserve-search="true" placeholder="وضعیت ضبط دوره..." label="name"
                   track-by="name">
      </multiselect>
    </div>


    <UploadImage valid_formats_text="صرفا فرمت ها jpg-jpeg-png-gif-svg قابل قبول است" title="آپلود کاور دسته بندی"
                 file_name="file"/>

    <label>
      وضعیت :
    </label>
    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>

    <label>
      آیا vip است؟
    </label>
    <div dir="ltr">
      <md-switch v-model="is_vip"></md-switch>
    </div>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>

  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import HelperClass from "../../services/HelperClass";
import CourseCategoryService from "../../services/Course/CourseCategoryService";
import Multiselect from 'vue-multiselect'
import UploadImage from "../../components/UploadImage";
import CourseTagService from "../../services/Course/CourseTagService";
import CourseService from "../../services/Course/CourseService";

export default {
  name: "Create",
  created() {
    this.getCategorySelectBox();
    this.getTags();
  },
  data() {
    return {

      status: false,
      percent: '',
      is_vip: 0,
      description: '',
      price: "",
      slug: '',
      short_description: '',
      meta: '',
      title: '',
      en_title: '',
      category: null,
      recording_status: null,
      recordingStatusArray: [

        {name: 'به زودی', value: 'soon'},
        {name: 'در حال ضبط', value: 'recording'},
        {name: 'تکمیل ضبط', value: 'finished'},

      ],
      categoryArray: [],
      level: null,
      levelArray: [
        {name: 'مبتدی', value: 'beginner'},
        {name: 'متوسط', value: 'medium'},
        {name: 'متخصص', value: 'advanced'},
      ],

      tags: [],
      tagsArray: []
    }
  },
  methods: {
    getCategorySelectBox() {
      CourseCategoryService.getSelectBox()
          .then(res => {

            if (res.status === 204) {
              return;
            }
            let data = res.data.data;

            data.forEach(item => {

              this.categoryArray.push({
                name: item.name,
                value: item.id
              })

            })


          }).catch(error => {

        HelperClass.showErrors(error, this.$noty)

      });
    },

    getTags() {
      CourseTagService.getTags()
          .then(res => {
            let status = res.status;
            if (status === 204) {
              return;
            }
            res.data.data.forEach(item => {
              this.tagsArray.push({name: item.fa_title, value: item.id})
            })

          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },

    validateNumber(e) {
      HelperClass.numericInputValidation(e)
    },
    validateDiscount(e) {
      HelperClass.discountValidationValue(e)
    },
    getData() {
      let data = new FormData();
      data.append('title', this.title);
      data.append('en_title', this.en_title);
      data.append('meta', this.meta);
      this.slug.trim().length ?
          data.append('slug', this.slug) : '';

      this.recording_status ?
          data.append('recording_status', this.recording_status.value)
          : '';

      if (typeof this.$store.state.image_file.file !== "undefined") {
        data.append('file', this.$store.state.image_file.file)
      }

      data.append('status', this.status ? 1 : 0);

      data.append('is_vip', this.is_vip ? 1 : 0);

      this.level ?
          data.append('level', this.level.value) : '';

      if (this.tags.length) {
        let ids = [];
        this.tags.forEach(item => {
          ids.push(item.value);
        })
        data.append('tags_id', JSON.stringify(ids))
      }

      this.category ?
          data.append('courseCategory_id', this.category.value) : '';

      data.append('short_description', this.short_description);
      data.append('description', this.description);
      data.append('price', this.price);

      this.percent.trim().length ?
          data.append('percent', this.percent) : '';
      return data;

    },

    submit() {
      this.$store.state.loader = true;
      let data = this.getData();
      CourseService.store(data)
          .then(() => {
            HelperClass.showSuccess(this.$noty);
            delete this.$store.state.image_file.file;
            this.$router.push({name: 'course-list'})
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })

    },
  },
  components: {
    Multiselect,
    UploadImage,
    Editor
  }
}
</script>

<style scoped>

</style>