<template>
  <div>
    <label>
      نام دسته بندی به فارسی :
    </label>
    <md-field>
      <md-input v-model="fa_name"></md-input>
    </md-field>
    <label>
      نام دسته بندی به لاتین :
    </label>
    <md-field>
      <md-input v-model="en_name"></md-input>
    </md-field>

    <label>
      اسلاگ :
    </label>
    <md-field>
      <md-input v-model="slug"></md-input>
    </md-field>

    <label>
      توضیحات متا :
    </label>
    <div class="form-group">
      <md-field>
        <md-textarea v-model="meta"></md-textarea>
      </md-field>
    </div>

    <label>
      توضیحات کوتاه :
    </label>
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
        language: 'fa',
        plugins: [
          'advlist directionality codesample autolink link image lists charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
          'table emoticons template paste help',
        ],
        width: 1000,
        height: 300,
        images_upload_url: $store.state.baseUrl + 'editor/upload',
        // image_upload_base_path:$store.state.baseUrl,
        toolbar:
          'undo redo | styleselect | codesample | bold italic | alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | link image | print preview media fullpage | ' +
          'forecolor backcolor emoticons | help | rtl ltr',
      }"
    />

    <div style="margin: 20px 0">
      <multiselect
        selectedLabel=" "
        selectLabel="انتخاب "
        deselectLabel="حذف"
        v-model="parentObject"
        :options="parentArray"
        :close-on-select="true"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder=" دسته والد مورد نظر را در صورت وجود انتخاب کنید..."
        label="name"
        track-by="name"
      >
      </multiselect>

      <ImagePreview
        :call-back="getInfo"
        not-image-found="فاقد عکس کاور"
        :image="cart"
        :image-id="imageId"
      />
    </div>

    <label>
      شناسه رنگی :
    </label>
    <div class="form-group" style="margin-bottom:60px">
      <input style="width:50%;" type="color" v-model="color" />
    </div>
    <div
      style="margin: 20px 0;font-size: 1.5em;font-weight: bold;text-align: center"
    >
      عکس کاور
    </div>
    <DropZone title="عکس کارت" :image-type="imageType" :driver="driver" />

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

    <label>
      نمایش در صفحه خانه :
    </label>
    <div dir="ltr">
      <md-switch v-model="show_in_home_page"></md-switch>
    </div>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>
  </div>
</template>

<script>
import HelperClass from "../../../services/HelperClass";
import CourseCategoryService from "../../../services/Course/CourseCategoryService";
import HttpVerbs from "../../../services/HttpVerbs";

const Multiselect = () => import("vue-multiselect");
const Editor = () => import("@tinymce/tinymce-vue");
const DropZone = () => import("../../../components/DropZon");
const ImagePreview = () => import("../../../components/ImagePreview");

export default {
  name: "Create",
  created() {
    this.getSelectBox();
    this.getInfo();
  },
  data() {
    return {
      parentObject: { name: "بدون دسته والد", value: 0 },
      status: false,
      fa_name: "",
      meta: "",
      slug: "",
      color: null,
      show_in_home_page: false,
      imageType: "cart",
      driver: "course_category_cart_image",
      short_description: "",
      en_name: "",
      description: "",
      cart: null,
      imageId: null,
      show_in_filter: false,
      parentArray: [{ name: "بدون دسته والد", value: 0 }],
    };
  },
  methods: {
    getInfo() {
      HttpVerbs.getRequest(`courses/categories/${this.$route.params.id}/edit`)
        .then((res) => {
          let result = res.data.data;
          let cart = result.cart;
          if (cart) {
            this.cart = cart.webp_path;
            this.imageId = cart.id;
          } else {
            this.cart = null;
            this.imageId = null;
          }
          let parent = result.father;
          if (parent) {
            this.parentObject = { name: parent.name, value: parent.id };
          }
          this.show_in_home_page = result.course_category.show_in_home_page
            ? true
            : false;
          this.color = result.course_category.color;

          let category = result.course_category;
          this.short_description = category.short_description;
          this.description = category.description;
          this.fa_name = category.name;
          this.en_name = category.en_name;
          this.meta = category.meta;
          this.status = category.status === 1;
          this.show_in_filter = category.show_in_filter === 1;
          this.slug = category.slug;
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },
    getSelectBox() {
      CourseCategoryService.getSelectBox(this.$route.params.id)
        .then((res) => {
          if (res.status === 204) {
            return;
          }
          let data = res.data.data;

          data.forEach((item) => {
            this.parentArray.push({
              name: item.name,
              value: item.id,
            });
          });
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },

    getData() {
      let data = new FormData();
      data.append("name", this.fa_name);
      data.append("short_description", this.short_description);
      data.append("description", this.description);
      data.append("meta", this.meta);

      this.slug.trim().length ? data.append("slug", this.slug) : "";
      this.en_name.trim().length ? data.append("en_name", this.en_name) : "";

      if (this.color) {
        data.append("color", this.color);
      }

      data.append("show_in_home_page", this.show_in_home_page ? 1 : 0);

      if (this.parentObject) {
        if (parseInt(this.parentObject.value) !== 0) {
          data.append("parent", this.parentObject.value);
        }
      }

      data.append("status", this.status ? 1 : 0);
      data.append("show_in_filter", this.show_in_filter ? 1 : 0);

      if (this.$store.state.uuid) {
        data.append("cart", this.$store.state.uuid);
      }

      return data;
    },

    submit() {
      this.$store.state.loader = true;
      let data = this.getData();

      HttpVerbs.putRequest(`courses/categories/${this.$route.params.id}`, data)
        .then(() => {
          HelperClass.showSuccess(this.$noty);
          close();
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },
  },
  components: {
    Multiselect,
    DropZone,
    ImagePreview,
    Editor,
  },
};
</script>

<style scoped></style>
