<template>
  <div>

    <label>
      عنوان ویدیو به فارسی :
    </label>
    <md-field>
      <md-input placeholder="عنوان ویدیو به فارسی..." v-model="title"></md-input>
    </md-field>

    <label>
      عنوان ویدیو به انگلیسی :
    </label>
    <md-field>
      <md-input placeholder="عنوان ویدیو به لاتین..." v-model="en_title"></md-input>
    </md-field>

    <label>
      اسلاگ :
    </label>
    <md-field>
      <md-input placeholder="اسلاگ..." v-model="slug"></md-input>
    </md-field>

    <label>
      زمان ویدیو به دقیقه :
    </label>
    <md-field>
      <md-input @keydown="validateNumber($event)" type="number" placeholder="زمان ویدیو به دقیقه..."
                v-model="time_in_minute"></md-input>
    </md-field>

    <label>
      توضیحات متا :
    </label>
    <md-field>
      <md-textarea placeholder="توضیحات متا..." v-model="meta"></md-textarea>
    </md-field>

    <label>
      توضیحات کوتاه :
    </label>
    <editor
        v-model="short_description"
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

    <label>
      انتخاب دوره ویدیو :
    </label>
    <multiselect @input="getSections" selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="courseId"
                 :options="coursesArray" :close-on-select="true"
                 :clear-on-select="false"
                 :preserve-search="true" placeholder="دوره این ویدیو را انتخاب کنید..." label="name"
                 track-by="name">
    </multiselect>

    <label>
      انتخاب فصل ویدیو :
    </label>
    <multiselect @input="getVideos" selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="sectionId"
                 :options="sectionArray" :close-on-select="true"
                 :clear-on-select="false"
                 :preserve-search="true" placeholder="فصل این ویدیو را انتخاب کنید..." label="name"
                 track-by="name">
    </multiselect>

    <label>
      انتخاب ویدیو بعدی :
    </label>

    <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="next_video_id"
                 :options="videosArray" :close-on-select="true"
                 :clear-on-select="false"
                 :preserve-search="true" placeholder="ویدیو بعدی را انتخاب کنید..." label="name"
                 track-by="name">
    </multiselect>

    <label>
      انتخاب ویدیو قبلی :
    </label>
    <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="prev_video_id"
                 :options="videosArray" :close-on-select="true"
                 :clear-on-select="false"
                 :preserve-search="true" placeholder="ویدیو قبلی را انتخاب کنید..." label="name"
                 track-by="name">
    </multiselect>

    <label style="margin-top: 30px">
      آیا رایگان است؟
    </label>
    <div dir="ltr">
      <md-switch v-model="is_free"></md-switch>
    </div>

    <label>
      وضعیت :
    </label>
    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>


    <div class="row">
      <div class="col-6">
        <div style="margin: 20px 0;font-weight: bold;text-align: center;font-size: 1.5em">
          فایل اصلی ویدیو(mp4) :
        </div>
        <VideoUploader/>
      </div>
      <div class="col-6">
        <div style="margin: 20px 0;font-weight: bold;text-align: center;font-size: 1.5em">
          فایل zip :
        </div>
        <ZipUploader/>
      </div>
    </div>
    <div class="form-group">
      <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>
    </div>


  </div>
</template>

<script>
import HttpVerbs from "../../services/HttpVerbs";
import HelperClass from "../../services/HelperClass";

const VideoUploader = () => import('../../components/VideoUploader')
const ZipUploader = () => import('../../components/ZipUploader')
const Editor = () => import('@tinymce/tinymce-vue')
const Multiselect = () => import('vue-multiselect')

export default {
  name: "create",
  created() {
    this.getCourses();
  },
  data() {
    return {
      coursesArray: [],
      courseId: null,
      sectionArray: [],
      sectionId: null,
      videosArray: [],
      title: '',
      en_title: '',
      status: false,
      meta: '',
      description: '',
      next_video_id: null,
      prev_video_id: null,
      time_in_minute: '',
      short_description: '',
      slug: '',
      course_id: '',
      course_section_id: '',
      is_free: false,
      next_video_link: '',
      previous_video_link: ''

    }
  },
  methods: {
    validateNumber(e) {
      HelperClass.numericInputValidation(e);
    },
    getCourses() {
      HttpVerbs.getRequest(`courses/select/box`)
          .then(res => {
            let result = res.data.data;
            result.forEach(item => {
              this.coursesArray.push({
                name: item.title,
                value: item.id
              })
            })
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getSections(value) {
      this.sectionArray = [];
      this.sectionId = null;
      this.videosArray = [];
      this.next_video_id = null;
      this.prev_video_id = null;

      if (!value) {
        return;
      }

      this.$store.state.loader = true;
      HttpVerbs.getRequest(`courses/${value.value}/sections/select/box`)
          .then(res => {
            this.$store.state.loader = false;
            let result = res.data.data;
            let status = res.status;
            if (status === 204) {
              this.$noty.warning('متاسفانه فصلی برای این دوره تعریف نشده است');
              return;
            }

            result.forEach(item => {
              this.sectionArray.push({
                name: item.title,
                value: item.id
              })
            })
          })
    },
    getVideos(value) {
      this.videosArray = [];
      this.next_video_id = null;
      this.prev_video_id = null;

      if (!value) {
        return;
      }
      HttpVerbs.getRequest(`courses/sections/${value.value}/videos/select/box`)
          .then(res => {
            let result = res.data.data;
            let status = res.status;
            if (status === 204) {
              this.$noty.warning(' ویدیوای برای این فصل پیدا نشد');
              return;
            }
            result.forEach(item => {
              this.videosArray.push({
                name: item.title,
                value: item.id
              })
            })
          })
    },

    getData() {
      let formData = new FormData();

      formData.append('title', this.title);

      formData.append('en_title', this.en_title);

      formData.append('meta', this.meta);

      this.slug.trim().length ?
          formData.append('slug', this.slug) : '';

      formData.append('short_description', this.short_description);

      formData.append('description', this.description);

      formData.append('time_in_minute', this.time_in_minute)

      this.courseId ?
          formData.append('course_id', this.courseId.value) : '';

      this.sectionId ?
          formData.append('courseSection_id', this.sectionId.value) : '';

      this.next_video_id ?
          formData.append('next_video_id', this.next_video_id.value) : '';

      this.prev_video_id ?
          formData.append('prev_video_id', this.prev_video_id.value) : '';

      formData.append('status', this.status ? 1 : 0)

      formData.append('is_free', this.is_free ? 1 : 0)

      this.$store.state.uploadedVideo ?
          formData.append('videoFileUUID', this.$store.state.uploadedVideo) : '';

      this.$store.state.uploadedZip ?
          formData.append('zipFileUUID', this.$store.state.uploadedZip) : '';

      return formData;
    },

    makeEmptyValues() {
      this.title = '';
      this.en_title = '';
      this.meta = '';
      this.short_description = '';
      this.description = '';
      this.slug = '';
      this.time_in_minute = '';
      this.is_free = false;
      this.status = false;
      this.videosArray = [];
      this.prev_video_id = null;
      this.next_video_id = null;
      this.courseId = null;
      this.coursesArray = [];
      this.course_section_id = null;
      this.sectionId = null;
      this.sectionArray = [];
      this.$store.state.uploadedZip = null;
      this.$store.state.uploadedVideo = null;
    },

    submit() {
      let data = this.getData();
      HttpVerbs.postRequest('videos', data)
          .then(() => {
            HelperClass.showSuccess(this.$noty);
            this.makeEmptyValues();
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    }

  },
  components: {
    VideoUploader,
    ZipUploader,
    Editor,
    Multiselect
  }
}
</script>

<style scoped>

</style>