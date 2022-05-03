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
      <md-input placeholder="طول جغرافیایی..." v-model="longitude"></md-input>
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
      <div :class="[`image-${value.id}`,'image']" v-for="value in images" :key="value.id">
        <div class="image_title">{{ setImageTitle(value.setting_file_type) }} :</div>
        <div>
          <md-button @click="showDialog(value.id)" class="md-raised md-accent">حذف</md-button>
        </div>
        <img :src="value.webp_path">
      </div>

    </md-card>

    <div>
    </div>
    <md-card style="margin: 20px 0;padding: 10px">
      <div class="row">

        <div class="col-4" title="لوگو">
          <DropZone setting-file-type="logo" message="لوگو" image-type="cart" :driver="driver"/>
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
      imageId: null,
      show_dialog: false,
      phone: '',
      address: '',
      email: '',
      latitude: '',
      longitude: '',
      about_us: '',
      short_description: '',
      images: [],

      driver: 'setting',
    }
  },

  methods: {
    removeImage() {
      this.show_dialog = false;
      HttpVerbs.postRequest(`setting/image/remove/${this.imageId}`)
          .then(() => {
            HelperClass.showSuccess(this.$noty, false)
            this.getInfo();
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    showDialog(id) {
      this.imageId = id;
      this.show_dialog = true
    },
    setImageTitle(value) {
      let title;
      switch (value) {
        case 'logo':
          title = 'لوگو';
          break;
        case 'first_page_banner':
          title = 'بنر صفحه اول';
          break;
        case 'top_banner':
          title = 'بنر بالای سایت';
          break;
        case 'contact_us_banner':
          title = 'کاور ارتباط با ما';
          break;
        case 'about_us_banner':
          title = 'کاور درباره ما';
          break;
      }
      return title;
    },
    getInfo() {
      HttpVerbs.getRequest('setting')
          .then(res => {

            let result = res.data.data;
            this.images = result.images;
            let setting = result.setting;
            this.about_us = setting.about_us;
            this.telegram_link = setting.telegram_link
            this.whatsapp_link = setting.whatsapp_link
            this.address = setting.address
            this.email = setting.email
            this.phone = setting.phone
            this.latitude = setting.latitude
            this.longitude = setting.longitude
            this.instagram_link = setting.instagram_link
            this.twitter_link = setting.twitter_link
            this.linkin_link = setting.linkin_link
            this.cell = setting.cell
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getData() {
      let formData = new FormData();
      formData.append('about_us', this.about_us);
      formData.append('telegram_link', this.telegram_link);
      formData.append('whatsapp_link', this.whatsapp_link);
      formData.append('address', this.address);
      formData.append('email', this.email);
      formData.append('phone', this.phone);
      formData.append('latitude', this.latitude);
      formData.append('longitude', this.longitude);
      formData.append('instagram_link', this.instagram_link);
      formData.append('twitter_link', this.twitter_link);
      formData.append('linkin_link', this.linkin_link);
      formData.append('cell', this.cell);
      return formData;
    },
    submit() {
      let data = this.getData();
      HttpVerbs.postRequest('setting', data)
          .then(() => {
            HelperClass.showSuccess(this.$noty)
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

<style scoped lang="scss">
.row > div {
  margin-bottom: 10px;
}

.image_title {
  margin: {
    top: 20px;
    bottom: 20px;
  };
  font-size: 1.5em;
  font-weight: bold;
}

.image {
  padding: 20px;
}

</style>