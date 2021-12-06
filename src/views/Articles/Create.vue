<template>
  <div>

    <md-field>

      <md-input placeholder="نام مقاله به فارسی..." v-model="title"></md-input>
    </md-field>
    <md-field>

      <md-input type="number" @keydown="validateNumeric($event)" placeholder="زمان مطالعه(دقیقه)..."
                v-model="time_to_read"></md-input>
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
        model-events="change keydown blur focus paste"
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
                images_upload_url:$store.state.baseUrl+'editor/upload',
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

    <div class="row">
      <div class="col-6 col-768-12">
        <div style="text-align: center;font-weight: bold;font-size: 1.5em;margin: 20px 0">عکس کارت</div>

        <DropZone image-name="cart" driver="article_category_cart_image" imageType="cart"/>

      </div>
      <div class="col-6 col-768-12">
        <div style="text-align: center;font-weight: bold;font-size: 1.5em;margin: 20px 0">عکس کاور</div>

        <DropZone image-name="cover" driver="article_category_cover_image" imageType="cover"/>

      </div>
    </div>


    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>

  </div>
</template>

<script>
import HelperClass from "../../services/HelperClass";
import ArticleTagService from "../../services/Article/ArticleTagService";
import ArticleCategoryService from "../../services/Article/ArticleCategoryService";
import ArticleService from "../../services/Article/ArticleService";

const Editor = () => import('@tinymce/tinymce-vue')
const Multiselect = () => import('vue-multiselect')
const DropZone = () => import('../../components/DropZon')
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
      time_to_read: null,
      description: '',

      writer: '',
      slug: '',
      short_description: '',
      meta: '',
      title: '',
      category: '',
      categoryArray: [
        {name: 'فاقد دسته ', value: 0},
      ],
      tags: [],
      tagsArray: [],
    }
  },
  methods: {
    validateNumeric(e) {
      HelperClass.numericInputValidation(e)
    },
    detect(event, editor) {
      console.log(event, editor)
    },
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

      if (this.time_to_read){
        data.append('time_to_read',this.time_to_read);
      }
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

      typeof this.$store.state.uploadedImages.cover !== 'undefined' ?

          data.append('cover_image', this.$store.state.uploadedImages.cover) :

          '';

      typeof this.$store.state.uploadedImages.cart !== 'undefined' ?

          data.append('cart_image', this.$store.state.uploadedImages.cart) :

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
      this.$store.state.loader = true;
      let data = this.getData();

      ArticleService.store(data)
          .then(() => {

            HelperClass.showSuccess(this.$noty);

            delete this.$store.state.image_file.file

            this.$router.push({name: 'article-list'})

          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
  },
  components: {
    Multiselect,
    Editor,
    DropZone
  },
}
</script>

<style scoped>

</style>