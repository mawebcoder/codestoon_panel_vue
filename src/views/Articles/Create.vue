<template>
  <div>

    <md-field>

      <md-input placeholder="نام دوره به فارسی..." v-model="fa_name"></md-input>
    </md-field>

    <md-field>

      <md-input placeholder="نام دوره به انگلیسی..." v-model="en_name"></md-input>
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

    <label >
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

      <md-input type="number" placeholder="قیمت..." v-model="price"></md-input>
    </md-field>


    <md-field>

      <md-input type="number" placeholder="درصد تخفیف..." v-model="percent"></md-input>
    </md-field>


    <div class="form-group">
      <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="parentObject"
                   :options="parentArray" :close-on-select="true"
                   :clear-on-select="false"
                   :preserve-search="true" placeholder="سطح دوره را انتخاب کنید..." label="name"
                   track-by="name">
      </multiselect>
    </div>


    <div class="form-group">
      <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="parentObject"
                   :options="parentArray" :close-on-select="true"
                   :clear-on-select="false"
                   :preserve-search="true" placeholder="دسته بندی مورد نظر را انتخاب کنید..." label="name"
                   track-by="name">
      </multiselect>
    </div>


    <div class="form-group">

      <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="parentObject"
                   :options="parentArray" :close-on-select="true"
                   :clear-on-select="false"
                   :preserve-search="true" placeholder="تگ های مورد نظر را انتخاب کنید..." label="name"
                   track-by="name">
      </multiselect>
    </div>


    <UploadImage valid_formats_text="صرفا فرمت ها jpg-jpeg-png-gif-svg قابل قبول است" title="آپلود کاور دسته بندی"
                 file_name="mohammad"/>


    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
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

export default {
  name: "Create",
  created() {
    this.getSelectBox();
  },
  data() {
    return {
      parentObject: '',
      status: false,
      percent:'',
      description:'',
      price:"",
      slug: '',
      short_description:'',
      meta: '',
      fa_name: '',
      en_name: '',
      parentArray: [
        {name: 'بدون دسته والد', value: 0},
      ],
    }
  },
  methods: {
    getSelectBox() {
      CourseCategoryService.getSelectBox()
          .then(res => {

            if (res.status === 204) {
              return;
            }
            let data = res.data.data;

            data.forEach(item => {

              this.parentArray.push({
                name: item.name,
                value: item.id
              })

            })


          }).catch(error => {

        HelperClass.showErrors(error, this.$noty)

      });
    },

    getData() {

    },
    makeEmptyValues() {

    },
    submit() {


    },

    showScrollTop() {

    }
  },
  components: {
    Multiselect,
    UploadImage,
    Editor
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>