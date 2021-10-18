<template>
  <div>



    <md-field>

      <md-input placeholder="نام دسته بندی به فارسی..." v-model="fa_name"></md-input>
    </md-field>

    <md-field>

      <md-input placeholder="نام دسته بندی به انگلیسی..." v-model="en_name"></md-input>
    </md-field>

    <md-field>

      <md-input placeholder="نامک..." v-model="slug"></md-input>
    </md-field>
    <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="parentObject"
                 :options="parentArray" :close-on-select="true"
                 :clear-on-select="false"
                 :preserve-search="true" placeholder=" دسته والد مورد نظر را در صورت وجود انتخاب کنید..." label="name"
                 track-by="name">
    </multiselect>


  <ImagePreview :call-back="getInfo" not-image-found="فاقد عکس کاور" :image="image" :image-id="imageId"/>

    <div style="margin: 20px 0;text-align: center;font-weight: bold;font-size: 1.5em">
      عکس کاور جدید
    </div>
    <DropZone :image-type="imageType" :driver="driver"/>
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
import DropZone from "../../../components/DropZon";
import HttpVerbs from "../../../services/HttpVerbs";

const ImagePreview=()=>import('../../../components/ImagePreview')

export default {
  name: "Create",
  created() {
    this.getSelectBox();
    this.getInfo();
  },
  data() {
    return {
      parentObject: {name: 'بدون دسته والد', value: 0},
      status: false,
      fa_name: '',
      en_name: '',
      slug: '',
      image: '',
      imageId: null,
      show_dialog: false,
      driver: 'article_category_cart_image',
      imageType: 'cart',
      show_in_filter: false,
      parentArray: [
        {name: 'بدون دسته والد', value: 0},
      ],
    }
  },
  methods: {
    getInfo() {
      HttpVerbs.getRequest(`articles/categories/edit/${this.$route.params.id}`)
          .then(res => {
            let result = res.data.data;
            this.fa_name = result.category.fa_name;
            this.en_name = result.category.en_name;
            this.status = result.category.status===1;
            this.show_in_filter=result.category.show_in_filter===1;
            this.slug = result.category.slug;
            this.parentObject = result.parent ? this.parentObject = {
              name: result.parent.fa_name,
              value: result.parent.id
            } : {name: 'بدون دسته والد', value: 0};

            this.image = result.image ?
                this.image = result.image.webp_path :
                null;
            this.imageId = result.image ?
                this.imageId = result.image.id : null;

          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getSelectBox() {
      HttpVerbs.getRequest(`articles/categories/select-box/${this.$route.params.id}`)
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
      if (this.slug.trim().length) {
        formData.append('slug', this.slug)
      }

      if (this.$store.state.uuid) {
        formData.append('uuid', this.$store.state.uuid);
      }
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

      this.$store.state.loader = true;
      let data = this.getData();
      HttpVerbs.putRequest(`articles/categories/${this.$route.params.id}`, data)
          .then(() => {
            HelperClass.showSuccess(this.$noty);
            close()
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })

    },
  },
  components: {
    Multiselect,
    DropZone,
    ImagePreview
  },
}
</script>

<style scoped>

</style>