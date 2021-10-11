<template>
  <div>

    <md-field>
      <md-input placeholder="لینک تلگرام..." v-model="telegram_link"></md-input>
    </md-field>

    <md-field>
      <md-input placeholder="لینک واتس آپ..." v-model="whatsapp_link"></md-input>
    </md-field>

    <md-field>
      <md-input placeholder="لینک اینستاگرام..." v-model="instagram_link"></md-input>
    </md-field>

    <md-field>
      <md-input placeholder="لینک توییتر..." v-model="twitter_link"></md-input>
    </md-field>

    <md-field>
      <md-input placeholder="لینک لینکدین..." v-model="linkin_link"></md-input>
    </md-field>

    <md-field>
      <md-input placeholder="شماره همراه..." v-model="cell"></md-input>
    </md-field>

    <md-field>
      <md-input placeholder="شماره ثابت..." v-model="phone"></md-input>
    </md-field>

    <md-field>
      <md-input placeholder="آدرس..." v-model="address"></md-input>
    </md-field>

    <md-field>
      <md-input placeholder="ایمیل..." v-model="email"></md-input>
    </md-field>

    <md-field>
      <md-input placeholder="طول جغرافیایی..." v-model="Longitude"></md-input>
    </md-field>

    <md-field>
      <md-input placeholder="عرض جغرافیایی..." v-model="latitude"></md-input>
    </md-field>

    <label>
      متن درباره ما :
    </label>

    <editor
        v-model="about_us"
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
    <md-card style="margin: 20px 0">

    </md-card>


    <md-card style="margin: 20px 0;padding: 10px">
      <div class="row">

        <div class="col-4" title="لوگو">
          <DropZone setting-file-type="log" message="لوگو" image-type="cart" :driver="driver"/>
        </div>
        <div title="عکس صفحه خانه" class="col-4">
          <DropZone setting-file-type="first_page_banner" message="عکس صفحه خانه" image-type="cover" :driver="driver"/>
        </div>
        <div title="عکس هدر بالای سایت" class="col-4">
          <DropZone setting-file-type="top_banner" message="عکس هدر بالای سایت" image-type="cover" :driver="driver"/>
        </div>
        <div title="بنر ارتباط با ما" class="col-4">
          <DropZone setting-file-type="contact_us_banner" message="بنر ارتباط با ما" image-type="cover"
                    :driver="driver"/>
        </div>
        <div title="بنر درباره ما" class="col-4">
          <DropZone setting-file-type="about_us_banner" message="بنر درباره ما" image-type="cover" :driver="driver"/>
        </div>
      </div>
    </md-card>
    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>


  </div>
</template>

<script>
import ArticleTagService from "../../services/Article/ArticleTagService";
import HelperClass from "../../services/HelperClass";
import HttpVerbs from "../../services/HttpVerbs";

const Editor = () => import('@tinymce/tinymce-vue')

const DropZone = () => import('../../components/DropZon')

export default {
  name: "Create",
  created() {
    this.getInfo()
  },
  data() {
    return {
      telegram_link: '',
      whatsapp_link: '',
      instagram_link: '',
      twitter_link: "",
      linkin_link: "",
      cell: '',
      phone: '',
      address: '',
      Longitude: '',
      email: '',
      latitude: '',
      about_us: '',

      driver: 'setting',
    }
  },
  methods: {
    getInfo() {
      HttpVerbs.getRequest('get/setting')
          .then(res => {
            console.log(res.data.data)
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getData() {
      let formData = new FormData();
      formData.append('fa_name', this.fa_name);
      formData.append('status', this.status ? 1 : 0);
      formData.append('slug', this.slug);
      formData.append('meta', this.meta);

      this.short_description.trim().length ?
          formData.append('short_description', this.short_description) : '';
      this.en_name.trim().length ?
          formData.append('en_name', this.en_name) :
          '';
      return formData;
    },
    submit() {
      this.$store.state.loader = true;
      let data = this.getData();

      ArticleTagService.store(data)
          .then(() => {
            HelperClass.showSuccess(this.$noty)
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })

    },
  },
  components: {
    Editor,
    DropZone
  }
}
</script>

<style scoped>
.row > div {
  margin-bottom: 10px;
}
</style>