<template>
  <div>
    <label>
      نام دوره به فارسی :
    </label>
    <md-field>
      <md-input placeholder="نام دوره به فارسی..." v-model="title"></md-input>
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
      <md-input v-model="slug"></md-input>
    </md-field>

    <label>
      اطلاعات متا :
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
      مدرس دوره :
    </label>
    <div class="form-group">
      <multiselect
        selectedLabel=" "
        selectLabel="انتخاب "
        deselectLabel="حذف"
        v-model="teacher"
        :options="teacherList"
        :close-on-select="true"
        :clear-on-select="false"
        :preserve-search="true"
        label="name"
        :internal-search="false"
        :loading="isLoading"
        track-by="name"
        @search-change="getTeacherList"
      >
      </multiselect>
    </div>

    <label>
      درباره مدرس :
    </label>
    <div class="form-group">
      <md-field>
        <md-textarea v-model="teacher_description"></md-textarea>
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
      سطح دوره را انتخاب کنید :
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
      ></multiselect>
    </div>

    <label>
      دسته بندی دوره را انتخاب کنید :
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
      ></multiselect>
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
      ></multiselect>
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
      ></multiselect>
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
      ></multiselect>
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

    <ImagePreview
      :call-back="getInfo"
      not-image-found="فاقد عکس کاور"
      :image="cart"
      :image-id="imageId"
    />

    <div
      style="margin: 20px 0;font-weight: bold;text-align: center;font-size: 1.5em"
    >
      آپلود عکس جدید :
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
import HelperClass from "../../services/HelperClass";
import CourseCategoryService from "../../services/Course/CourseCategoryService";
import CourseTagService from "../../services/Course/CourseTagService";
import HttpVerbs from "../../services/HttpVerbs";

const ImagePreview = () => import("../../components/ImagePreview");

const Editor = () => import("@tinymce/tinymce-vue");
const Multiselect = () => import("vue-multiselect");
const DropZone = () => import("../../components/DropZon");
export default {
  name: "Create",
  created() {
    this.getCategorySelectBox();
    this.getTags();
    this.getCoursesSelectBox();
    this.getInfo();
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
      color: null,
      show_in_home_page: false,
      short_description: "",
      is_coming_soon: false,
      meta: "",
      title: "",
      en_title: "",
      cart: null,
      imageId: null,
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
      teacherList: [],
      isLoading:false,
      teacher: null,
      teacher_description: "",
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
    getTeacherList(searchQuery) {
      this.isLoading = true;
      if (searchQuery.length < 3) {
        return;
      }
      HttpVerbs.getRequest("/users/search?search=" + searchQuery)
        .then((res) => {
          this.teacherList = [];

          if (res.status === 204) {
            this.teacherList = [];
            this.isLoading = false;
            return;
          }

          let result = res.data.data;

          result.forEach((item) => {
            this.teacherList.push({ name: item.email, value: item.id });
          });
          this.isLoading = false;
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
          this.isLoading = false;
        });
    },
    getInfo() {
      HttpVerbs.getRequest(`courses/${this.$route.params.id}/edit`)
        .then((res) => {
          let result = res.data.data;
          let category = result.category;
          if (category) {
            this.category = { name: category.name, value: category.id };
          }

          let prerequisites = result.prerequisites;

          if (prerequisites) {
            prerequisites.forEach((item) => {
              this.courseIds.push({
                name: item.title,
                value: item.id,
              });
            });
          }
          let tags = result.tags;

          if (tags.length) {
            tags.forEach((item) => {
              this.tags.push({
                name: item.fa_title,
                value: item.id,
              });
            });
          }

          let teacher = result.teacherInfo;
          this.teacher = { name: teacher.email, value: teacher.id };
          
          

          let course = result.course;
          this.teacher_description = course.teacher_description;

          this.title = course.title;
          this.en_title = course.en_title;

          this.slug = course.slug;
          this.meta = course.meta;
          this.show_in_home_page = course.show_in_home_page ? true : false;
          this.color = course.color;
          this.is_coming_soon = course.is_coming_soon ? true : false;
          this.short_description = course.short_description;
          this.description = course.description;
          this.price = parseInt(course.price);
          this.percent = course.percent;
          this.status = course.status === 1;
          this.is_vip = course.is_vip === 1;

          this.getLevel(course.level);
          this.getRecordStatus(course.record_status);

          let image = result.cartImage;
          this.cart = image.webp_path;
          this.imageId = image.id;
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },
    getRecordStatus(recordStatus) {
      switch (recordStatus) {
        case "soon":
          this.recording_status = { name: "به زودی", value: "soon" };
          break;
        case "recording":
          this.recording_status = { name: "در حال ضبط", value: "recording" };
          break;
        case "finished":
          this.recording_status = { name: "تکمیل ضبط", value: "finished" };
          break;
      }
    },
    getLevel(level) {
      switch (level) {
        case "beginner":
          this.level = { name: "مبتدی", value: "beginner" };
          break;
        case "advanced":
          this.level = { name: "پیشرفته", value: "advanced" };
          break;
        case "medium":
          this.level = { name: "متوسط", value: "medium" };
          break;
      }
    },
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

      if (this.courseIds && this.courseIds.length) {
        let ids = [];
        this.courseIds.forEach((item) => {
          ids.push(item.value);
        });
        data.append("prerequisites", JSON.stringify(ids));
      }

      if (this.teacher) {
        data.append("teacher_id", this.teacher.value);
      }

      if (this.teacher_description.trim().length) {
        data.append("teacher_description", this.teacher_description);
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

      if (this.tags && this.tags.length) {
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

      this.percent && this.percent.length
        ? data.append("percent", this.percent)
        : "";
      return data;
    },

    submit() {
      this.$store.state.loader = true;
      let data = this.getData();
      HttpVerbs.putRequest(`courses/${this.$route.params.id}`, data)
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
    ImagePreview,
  },
};
</script>

<style scoped></style>
