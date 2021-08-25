<template>
  <div>

    <md-field>

      <md-input placeholder="نام   پلن..." v-model="title"></md-input>
    </md-field>

    <md-field>

      <md-input @keydown="validateNumber($event)" type="number" placeholder="قیمت..." v-model="price"></md-input>
    </md-field>


    <md-field>

      <md-input @keydown="validateNumber($event)" type="number" placeholder="زمان اعتبار(ماه)..."
                v-model="length"></md-input>
    </md-field>


    <label>
      توضیحات :
    </label>
    <editor
        v-model="text"
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
    <UploadImage valid_formats_text="صرفا فرمت ها jpg-jpeg-png-gif-svg قابل قبول است" title="آپلود کاور پلن"
                 file_name="file"/>
    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>

  </div>
</template>

<script>
import HelperClass from "../../services/HelperClass";
import Editor from '@tinymce/tinymce-vue'
import UploadImage from "../../components/UploadImage";
import VipService from "../../services/Vip/VipService";

export default {
  name: "Create",
  data() {
    return {
      status: false,
      title: '',
      price: '',
      text: '',
      length: ''
    }
  },
  methods: {
    getData() {
      let data = new FormData();
      this.length.trim().length ?
          data.append('length', this.length) :
          '';

      data.append('status', this.status ? 1 : 0);
      data.append('title', this.title);
      data.append('price', this.price);
      data.append('text', this.text);

      typeof (this.$store.state.image_file.file)!=="undefined"?

          data.append('file', this.$store.state.image_file.file) :
          '';

      return data;

    },
    submit() {
      this.$store.state.loader = true;

      let data = this.getData();

      VipService.store(data)
          .then(() => {
            HelperClass.showSuccess(this.$noty);
            delete this.$store.state.image_file.file;
            this.$router.push({name: 'vip-list'})
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })


    },
    validateNumber(e) {
      HelperClass.numericInputValidation(e)
    },
  },
  mounted() {
  },
  components: {
    Editor,
    UploadImage
  }
}
</script>

<style scoped>

</style>