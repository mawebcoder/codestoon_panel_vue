<template>
  <div>

    <md-dialog :md-active.sync="show_dialog">
      <md-dialog-title>حذف آیتم ها</md-dialog-title>

      <div style="padding: 10px">
        آیا اطمینان دارید؟
      </div>
      <md-dialog-actions>
        <md-button style="margin: 0 10px" @click="removeImage" class="md-raised md-accent">بله</md-button>
        <md-button @click="show_dialog = false" class="md-raised md-primary">خیر</md-button>
      </md-dialog-actions>

    </md-dialog>

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

    <template v-if="coverImage">
      <md-card style="margin: 20px 0">
        <div>
          <div>
            <md-button @click="showDialog" class="md-raised md-accent">حذف</md-button>
          </div>
          <img alt="عکس کاور پلن" :src="coverImage">
        </div>

      </md-card>
    </template>
    <template v-else>
      فاقد عکس کاور
    </template>


    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>

    <DropZone :message="message" :image-type="imageType" :driver="driver"/>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>

  </div>
</template>

<script>
import HelperClass from "../../services/HelperClass";
import Editor from '@tinymce/tinymce-vue'
import HttpVerbs from "../../services/HttpVerbs";

const DropZone = () => import('../../components/DropZon')
export default {
  name: "Create",
  created() {
    this.getInfo()
  },
  data() {
    return {
      show_dialog: false,
      message: 'عکس کاور را انتخاب کنید',
      status: false,
      title: '',
      price: '',
      coverImage: '',
      text: '',
      length: '',
      fileId: null,
      imageType: 'cart',
      driver: 'vip_cart_image'
    }
  },
  methods: {
    getInfo() {
      HttpVerbs.getRequest(`vip/${this.$route.params.id}/edit`)
          .then(res => {
            let result = res.data.data.data;
            this.price = result.price;
            this.text = result.text;
            this.title = result.title;
            this.status = result.status === 1;
            this.length = result.length;
            this.coverImage = res.data.data.image ? res.data.data.image.webp_path : null;
            this.fileId = res.data.data.image ? res.data.data.image.id : null;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getData() {
      let data = new FormData();
      data.append('length', this.length)

      data.append('status', this.status ? 1 : 0);
      data.append('title', this.title);
      data.append('price', parseInt(this.price));
      data.append('text', this.text);
      if (this.$store.state.uuid) {
        data.append('uuid', this.$store.state.uuid)
      }
      return data;

    },
    submit() {
      this.$store.state.loader = true;

      let data = this.getData();

      HttpVerbs.putRequest(`vip/${this.$route.params.id}`, data)
          .then(() => {
            HelperClass.showSuccess(this.$noty)
            close()
          })
          .catch(error => {
            HelperClass.showErrors(error,this.$noty)
          })

    },
    validateNumber(e) {
      HelperClass.numericInputValidation(e)

    },
    showDialog() {
      this.show_dialog = true
    },
    removeImage() {
      this.show_dialog = false;
      HttpVerbs.deleteRequest(`upload/delete/${this.fileId}`)
          .then(() => {
            HelperClass.showSuccess(this.$noty, false)
            this.getInfo();
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

</style>