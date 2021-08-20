<template>
  <div>

    <md-field>

      <md-input placeholder="نام دسته بندی به فارسی..." v-model="fa_name"></md-input>
    </md-field>

    <md-field>

      <md-input placeholder="نام دسته بندی به انگلیسی..." v-model="en_name"></md-input>
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
    <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="parentObject"
                 :options="parentArray" :close-on-select="true"
                 :clear-on-select="false"
                 :preserve-search="true" placeholder=" دسته والد مورد نظر را در صورت وجود انتخاب کنید..." label="name"
                 track-by="name">
    </multiselect>


    <UploadImage valid_formats_text="صرفا فرمت ها jpg-jpeg-png-gif-svg قابل قبول است" title="آپلود کاور دسته بندی"
                 file_name="file"/>


    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>

  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import HelperClass from "../../../services/HelperClass";
import CourseCategoryService from "../../../services/Course/CourseCategoryService";
import Multiselect from 'vue-multiselect'
import UploadImage from "../../../components/UploadImage";

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
      meta:"",
      slug:'',
      short_description:'',
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

      let data = new FormData();
      data.append('name', this.fa_name);
      data.append('short_description',this.short_description);
      data.append('description',this.description);
      data.append('meta',this.meta);

      this.slug.trim().length?
          data.append('slug',this.slug):'';
      this.en_name.trim().length ?
          data.append('en_name', this.en_name) :
          '';


      if (this.parentObject) {

        if (parseInt(this.parentObject.value) !== 0) {
          data.append('parent', this.parentObject.value)
        }
      }

      data.append('status', this.status ? 1 : 0);

      typeof (this.$store.state.image_file.file) !== 'undefined' ?
          data.append('file', this.$store.state.image_file.file) : '';


      return data;
    },
    submit() {
      this.$store.state.loader=true;
      let data=this.getData();

      CourseCategoryService.storeCourseCategory(data)
      .then(()=>{

          HelperClass.showSuccess(this.$noty);

          delete this.$store.state.image_file.file;

          this.$router.push({name:'course-category-list'})




      }).catch(error=>{
        HelperClass.showErrors(error,this.$noty);
      })

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