<template>
  <div>
    <label>
      نام دوره به فارسی :
    </label>
    <md-field>
      <md-input v-model="title"></md-input>
    </md-field>

    <label>
      نام دوره به انگلیسی :
    </label>
    <md-field>
      <md-input v-model="en_title"></md-input>
    </md-field>

    <label>
      اسلاگ :
    </label>
    <md-field>
      <md-input placeholder="اسلاگ..." v-model="slug"></md-input>
    </md-field>

    <label>
      توضیحات تگ متا :
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

        toolbar:
          'undo redo | styleselect | codesample | bold italic | alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | link image | print preview media fullpage | ' +
          'forecolor backcolor emoticons | help | rtl ltr',
      }"
    />

    <label>
      قیمت :
    </label>
    <md-field>
      <md-input
        @keydown="validateNumber($event)"
        type="number"
        v-model="price"
      ></md-input>
    </md-field>

    <label>
      درصد تخفیف :
    </label>
    <md-field>
      <md-input
        @keyup="validateDiscount($event)"
        @keydown="validateNumber($event)"
        type="number"
        v-model="percent"
      ></md-input>
    </md-field>

    <label>
      سطح دوره :
    </label>
    <div class="form-group">
      <multiselect
        selectedLabel=" "
        selectLabel="انتخاب "
        deselectLabel="حذف"
        v-model="level"
        :options="levelArray"
        :close-on-select="true"
        :clear-on-select="false"
        :preserve-search="true"
        label="name"
        track-by="name"
      >
      </multiselect>
    </div>

    <label>
      دسته بندی دوره :
    </label>
    <div class="form-group">
      <multiselect
        selectedLabel=" "
        selectLabel="انتخاب "
        deselectLabel="حذف"
        v-model="category"
        :options="categoryArray"
        :close-on-select="true"
        :clear-on-select="false"
        :preserve-search="true"
        label="name"
        track-by="name"
      >
      </multiselect>
    </div>
    <label>
      تگ های دوره را انتخاب کنید :
    </label>
    <div class="form-group">
      <multiselect
        :multiple="true"
        selectedLabel=" "
        selectLabel="انتخاب "
        deselectLabel="حذف"
        v-model="tags"
        :options="tagsArray"
        :close-on-select="true"
        :clear-on-select="false"
        :preserve-search="true"
        label="name"
        track-by="name"
      >
      </multiselect>
    </div>
    <label>
      وضعیت ضبط دوره :
    </label>
    <div class="form-group">
      <multiselect
        selectedLabel=" "
        selectLabel="انتخاب "
        deselectLabel="حذف"
        v-model="recording_status"
        :options="recordingStatusArray"
        :close-on-select="true"
        :clear-on-select="false"
        :preserve-search="true"
        label="name"
        track-by="name"
      >
      </multiselect>
    </div>
    <label>
      پیشنیازهای دوره :
    </label>
    <div class="form-group">
      <multiselect
        multiple
        selectedLabel=" "
        selectLabel="انتخاب "
        deselectLabel="حذف"
        v-model="courseIds"
        :options="coursesArray"
        :close-on-select="true"
        :clear-on-select="false"
        :preserve-search="true"
        label="name"
        track-by="name"
      >
      </multiselect>
    </div>

    <label>
      تم رنگی :
    </label>
    <div class="form-group">
      <input
        type="color"
        style="width:50%;margin-bottom:20px"
        v-model="color"
      />
    </div>

    <div
      style="margin: 20px 0;font-weight: bold;text-align: center;font-size: 1.5em"
    >
      عکس کارت دوره :
    </div>
    <DropZone :image-type="imageType" :driver="driver" />

    <label>
      وضعیت :
    </label>
    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>

    <label>
      قرار گرفتن در لیست به زودی ها :
    </label>
    <div dir="ltr">
      <md-switch v-model="is_coming_soon"></md-switch>
    </div>

    <label>
      آیا vip است؟
    </label>
    <div dir="ltr">
      <md-switch v-model="is_vip"></md-switch>
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
import Editor from "@tinymce/tinymce-vue";
import HelperClass from "../../services/HelperClass";
import CourseCategoryService from "../../services/Course/CourseCategoryService";
import Multiselect from "vue-multiselect";
import CourseTagService from "../../services/Course/CourseTagService";
import CourseService from "../../services/Course/CourseService";
import HttpVerbs from "../../services/HttpVerbs";

const DropZone = () => import("../../components/DropZon");
export default {
  name: "Create",
  created() {
    this.getCategorySelectBox();
    this.getTags();
    this.getCoursesSelectBox();
  },
  data() {
    return {
      status: false,
      percent: "",
      is_vip: 0,
      imageType: "cart",
      description: "",
      price: "",
      driver: "course_cart_image",
      slug: "",
      short_description: "",
      meta: "",
      is_coming_soon: false,
      title: "",
      en_title: "",
      color: null,
      show_in_home_page: false,
      category: null,
      recording_status: null,
      recordingStatusArray: [
        { name: "به زودی", value: "soon" },
        { name: "در حال ضبط", value: "recording" },
        { name: "تکمیل ضبط", value: "finished" },
      ],
      categoryArray: [],
      coursesArray: [],
      courseIds: [],
      level: null,
      levelArray: [
        { name: "مبتدی", value: "beginner" },
        { name: "متوسط", value: "medium" },
        { name: "متخصص", value: "advanced" },
      ],

      tags: [],
      tagsArray: [],
    };
  },
  methods: {
    getCoursesSelectBox() {
      HttpVerbs.getRequest("courses/select/box")
        .then((res) => {
          let result = res.data.data;
          this.coursesArray = [];
          this.courseIds = [];
          result.forEach((item) => {
            this.coursesArray.push({
              name: item.title,
              value: item.id,
            });
          });
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },
    getCategorySelectBox() {
      CourseCategoryService.getSelectBox()
        .then((res) => {
          this.categoryArray = [];
          this.category = null;
          if (res.status === 204) {
            return;
          }
          let data = res.data.data;

          data.forEach((item) => {
            this.categoryArray.push({
              name: item.name,
              value: item.id,
            });
          });
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },

    getTags() {
      CourseTagService.getTags()
        .then((res) => {
          let status = res.status;
          if (status === 204) {
            return;
          }
          res.data.data.forEach((item) => {
            this.tagsArray.push({ name: item.fa_title, value: item.id });
          });
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },

    validateNumber(e) {
      HelperClass.numericInputValidation(e);
    },
    validateDiscount(e) {
      HelperClass.discountValidationValue(e);
    },
    getData() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("en_title", this.en_title);
      data.append("meta", this.meta);
      this.slug.trim().length ? data.append("slug", this.slug) : "";

      if (this.courseIds.length) {
        let ids = [];
        this.courseIds.forEach((item) => {
          ids.push(item.value);
        });
        data.append("prerequisites", JSON.stringify(ids));
      }

      if (this.color) {
        data.append("color", this.color);
      }
      data.append("show_in_home_page", this.show_in_home_page ? 1 : 0);

      data.append("is_coming_soon", this.is_coming_soon ? 1 : 0);
      
      this.recording_status
        ? data.append("record_status", this.recording_status.value)
        : "";
   
      if (this.$store.state.uuid) {
        data.append("uuid", this.$store.state.uuid);
      }

      data.append("status", this.status ? 1 : 0);

      data.append("is_vip", this.is_vip ? 1 : 0);

      this.level ? data.append("level", this.level.value) : "";

      if (this.tags.length) {
        let ids = [];
        this.tags.forEach((item) => {
          ids.push(item.value);
        });
        data.append("tags", JSON.stringify(ids));
      }

      this.category
        ? data.append("courseCategory_id", this.category.value)
        : "";

      data.append("short_description", this.short_description);
      data.append("description", this.description);
      data.append("price", this.price);

      this.percent.trim().length ? data.append("percent", this.percent) : "";
      return data;
    },

    submit() {
      this.$store.state.loader = true;
      let data = this.getData();
      CourseService.store(data)
        .then(() => {
          HelperClass.showSuccess(this.$noty);
          delete this.$store.state.image_file.file;
          this.$router.push({ name: "course-list" });
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },
  },
  components: {
    Multiselect,
    Editor,
    DropZone,
  },
};
</script>

<style scoped></style>
