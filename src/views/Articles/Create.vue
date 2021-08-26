<template>
  <div>

    <md-field>

      <md-input placeholder="نام مقاله به فارسی..." v-model="title"></md-input>
    </md-field>

    <md-field>

      <md-input placeholder="اسلاگ..." v-model="slug"></md-input>
    </md-field>

    <div class="form-group">
      <md-field>
        <label>توضیحات متا...</label>
        <md-textarea v-model="meta"></md-textarea>
      </md-field>
    </div>

    <div class="form-group">
      <md-field>
        <label>نام نویسنده ...</label>
        <md-textarea v-model="writer"></md-textarea>
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


    <UploadImage valid_formats_text="صرفا فرمت ها jpg-jpeg-png-gif-svg قابل قبول است" title="آپلود کاور مقاله"
                 file_name="file"/>


    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>

  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import HelperClass from "../../services/HelperClass";
import Multiselect from 'vue-multiselect'
import UploadImage from "../../components/UploadImage";
import ArticleTagService from "../../services/Article/ArticleTagService";
import ArticleCategoryService from "../../services/Article/ArticleCategoryService";
import ArticleService from "../../services/Article/ArticleService";

export default {
  name: "Create",
  created() {
    this.getSelectBoxCategories();
    this.getSelectBoxTags();
  },
  data() {
    return {

      parentObject: '',
      status: false,

      description: '',

      writer: '',
      slug: '',
      short_description: '',
      meta: '',
      title:'',
      category: '',
      categoryArray: [
        {name: 'فاقد دسته ', value: 0},
      ],
      tags: [],
      tagsArray: [],
    }
  },
  methods: {
    numericInputValidation(event) {
      HelperClass.numericInputValidation(event);
    },
    discountRangeValidation(event) {
      HelperClass.discountValidationValue(event);
    },
    getSelectBoxCategories() {
      ArticleCategoryService.getParents()
          .then(res => {
            if (res.status === 204) {
              return;
            }
            let data = res.data.data;

            data.forEach(item => {

              this.categoryArray.push({
                name: item.fa_name,
                value: item.id
              })

            })
          }).catch(error => {

        HelperClass.showErrors(error, this.$noty)

      });
    },

    getSelectBoxTags() {
      ArticleTagService.getTagsForSelectBox()
          .then(res => {
            if (res.status === 204) {
              return;
            }
            let data = res.data.data;

            data.forEach(item => {

              this.tagsArray.push({
                name: item.fa_name,
                value: item.id
              })

            })


          }).catch(error => {

        HelperClass.showErrors(error, this.$noty)

      });
    },

    getData() {
      let data = new FormData();

      data.append('title', this.title);

      data.append('content', this.description);

      data.append('status', this.status ? 1 : 0);

      this.writer.trim().length ?
          data.append('writer', this.writer) : '';

      this.slug.trim().length ?
          data.append('slug', this.slug) : '';

      this.category.value ?
          data.append('article_category', this.category.value) : '';

      let tag_ids = this.getTagIds();
      tag_ids ?
          data.append('tags', JSON.stringify(tag_ids)) : '';


      data.append('meta', this.meta);

      data.append('short_description', this.short_description);

      typeof this.$store.state.image_file.file !== 'undefined' ?

          data.append('file', this.$store.state.image_file.file) :

          '';

      return data;


    },
    getTagIds() {
      if (this.tags.length) {
        let ids = [];
        this.tags.forEach(item => {
          ids.push(item.value)
        })
        return ids;
      }
      return false;
    },
    submit() {
      this.$store.state.loader=true;
      let data = this.getData();

      ArticleService.store(data)
          .then(() => {

            HelperClass.showSuccess(this.$noty);

            delete this.$store.state.image_file.file

            this.$router.push({name:'article-list'})

          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
  },
  components: {
    Multiselect,
    UploadImage,
    Editor
  },
}
</script>

<style scoped>

</style>