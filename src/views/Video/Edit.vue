<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>حذف فایل ویدیو!</md-dialog-title>

      <div style="padding: 10px">
        آیا اطمینان دارید؟
      </div>
      <md-dialog-actions>
        <md-button
          style="margin: 0 10px"
          @click="removeVideo"
          class="md-raised md-accent"
          >بله</md-button
        >
        <md-button @click="showDialog = false" class="md-raised md-primary"
          >خیر</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="showDialogZip">
      <md-dialog-title>حذف فایل zip !</md-dialog-title>

      <div style="padding: 10px">
        آیا اطمینان دارید؟
      </div>
      <md-dialog-actions>
        <md-button
          style="margin: 0 10px"
          @click="removeZipFile"
          class="md-raised md-accent"
          >بله</md-button
        >
        <md-button @click="showDialogZip = false" class="md-raised md-primary"
          >خیر</md-button
        >
      </md-dialog-actions>
    </md-dialog>
    <label>
      عنوان ویدیو به فارسی :
    </label>
    <md-field>
      <md-input
        placeholder="عنوان ویدیو به فارسی..."
        v-model="title"
      ></md-input>
    </md-field>

    <label>
      عنوان ویدیو به انگلیسی :
    </label>
    <md-field>
      <md-input
        placeholder="عنوان ویدیو به لاتین..."
        v-model="en_title"
      ></md-input>
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
      <md-input
        @keydown="validateNumber($event)"
        type="number"
        placeholder="زمان ویدیو به دقیقه..."
        v-model="time_in_minute"
      ></md-input>
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
    <label>
      توضیحات کامل :
    </label>
    <editor
      v-model="description"
      model-events="change keydown blur focus paste"
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

    <label>
      انتخاب دوره ویدیو :
    </label>
    <multiselect
      @input="getSections"
      selectedLabel=" "
      selectLabel="انتخاب "
      deselectLabel="حذف"
      v-model="courseId"
      :options="coursesArray"
      :close-on-select="true"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="دوره این ویدیو را انتخاب کنید..."
      label="name"
      track-by="name"
    >
    </multiselect>

    <label>
      انتخاب فصل ویدیو :
    </label>
    <multiselect
      @input="getVideos"
      selectedLabel=" "
      selectLabel="انتخاب "
      deselectLabel="حذف"
      v-model="sectionId"
      :options="sectionArray"
      :close-on-select="true"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="فصل این ویدیو را انتخاب کنید..."
      label="name"
      track-by="name"
    >
    </multiselect>

    <label>
      انتخاب ویدیو بعدی :
    </label>
    <multiselect
      selectedLabel=" "
      selectLabel="انتخاب "
      deselectLabel="حذف"
      v-model="next_video_id"
      :options="videosArray"
      :close-on-select="true"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="ویدیو بعدی را انتخاب کنید..."
      label="name"
      track-by="name"
    >
    </multiselect>

    <label>
      انتخاب ویدیو قبلی :
    </label>
    <multiselect
      selectedLabel=" "
      selectLabel="انتخاب "
      deselectLabel="حذف"
      v-model="prev_video_id"
      :options="videosArray"
      :close-on-select="true"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="ویدیو قبلی را انتخاب کنید..."
      label="name"
      track-by="name"
    >
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

    <!--    video file section-->
    <template v-if="streamingStatus=='done'">
      <div class="d-flex justify-content-center align-items-center">
        <md-button @click="showDialog = true" class="md-raised md-accent"
          >حذف ویدیو</md-button
        >
      </div>

      <video-player :options="options" />
    </template>
    <template v-else>
      <div
        class="d-flex justify-content-center"
        style="margin: 40px 0;font-size:1.5em;font-weight: bold"
      >
        ویدیو استریم شده هم اکنون آماده نیست.این پروسه ممکن است کمی زمان بر باشد.!!!
      </div>
    </template>

    <!--    zip file section-->
    <template v-if="zipId">
      <div class="d-flex justify-content-center align-items-center">
        <md-button @click="showDialogZip = true" class="md-raised md-accent"
          >حذف فایل zip</md-button
        >
      </div>
      <div style="margin: 30px 0" class="justify-content-center d-flex">
        <md-button @click="downloadZip" class="md-raised md-primary">
          دریافت فایل zip
          <md-icon>folder_zip</md-icon>
        </md-button>
      </div>
    </template>
    <template v-else>
      <div
        class="d-flex justify-content-center"
        style="margin: 40px 0;font-size:1.5em;font-weight: bold"
      >
        فایل zip آپلود نشده است!!!
      </div>
    </template>

    <div class="row">
      <div class="col-6">
        <div
          style="margin: 20px 0;font-weight: bold;text-align: center;font-size: 1.5em"
        >
          فایل اصلی ویدیو(mp4) :
        </div>
        <VideoUploader />
      </div>
      <div class="col-6">
        <div
          style="margin: 20px 0;font-weight: bold;text-align: center;font-size: 1.5em"
        >
          فایل zip :
        </div>
        <ZipUploader />
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

import VideoPlayer from "../../components/VideoPlayer";

const VideoUploader = () => import("../../components/VideoUploader");
const ZipUploader = () => import("../../components/ZipUploader");
const Editor = () => import("@tinymce/tinymce-vue");
const Multiselect = () => import("vue-multiselect");

export default {
  name: "create",
  created() {
    this.getCourses();
    this.getInfo();
  },
  data() {
    return {
      showDialogZip: false,
      coursesArray: [],
      courseId: null,
      sectionArray: [],
      showDialog: false,
      sectionId: null,
      videosArray: [],
      title: "",
      en_title: "",
      status: false,
      streamingStatus: false,
      meta: "",
      description: "",
      next_video_id: null,
      prev_video_id: null,
      time_in_minute: "",
      short_description: "",
      slug: "",
      zipId: null,
      course_id: "",
      mp4_id: null,
      course_section_id: "",
      is_free: false,
      next_video_link: "",
      previous_video_link: "",
      player: null,
      options: {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: `${this.$store.state.backendUrl}stream/videos/stream.m3u8/${
              this.$route.params.id
            }?token=${this.$cookies.get("token")}`,
            type: "application/x-mpegURL",
          },
        ],
      },
    };
  },
  methods: {
    downloadZip() {
      open(this.$store.state.baseUrl + "videos/download/" + this.zipId);
    },
    removeZipFile() {
      HttpVerbs.deleteRequest(`upload/delete/${this.zipId}`)
        .then(() => {
          this.$noty.info("حذف با موفقیت انجام شد");
          this.getInfo();
          this.$store.state.loader = false;
          this.showDialogZip = false;
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },
    removeVideo() {
      HttpVerbs.deleteRequest(`stream/${this.$route.params.id}`)
        .then(() => {
          this.$noty.info("حذف ویدیو با موفقیت انجام شد");
          this.getInfo();
          this.$store.state.loader = false;
          this.showDialog = false;
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },
    getInfo() {
      HttpVerbs.getRequest(`videos/${this.$route.params.id}/edit`)
        .then((res) => {
          let result = res.data.data;
          let course = result.course;
          let section = result.course_section;
          let mp4 = result.mp4;
          let zip = result.zipFile;
          let video = result.video;

          this.streamingStatus=video.stream_status;

          let nextVideo = result.nextVideo;
          let preVideo = result.prevVideo;
          if (course) {
            this.courseId = { value: course.id, name: course.title };
          } else {
            this.courseId = null;
          }
          if (section) {
            this.sectionId = { name: section.title, value: section.id };
          } else {
            this.sectionId = null;
          }
          if (nextVideo) {
            this.next_video_id = { name: nextVideo.title, value: nextVideo.id };
          } else {
            this.next_video_id = null;
          }
          if (preVideo) {
            this.prev_video_id = { name: preVideo.title, value: preVideo.id };
          } else {
            this.prev_video_id = null;
          }

          this.title = video.title;
          this.en_title = video.en_title;
          this.status = video.status === 1;
          this.is_free = video.is_free === 1;
          this.slug = video.slug;
          this.description = video.description;
          this.short_description = video.short_description;
          this.meta = video.meta;
          this.time_in_minute = video.time_in_minute;

          if (mp4) {
            this.mp4_id = mp4.id;
          } else {
            this.mp4_id = null;
          }

          if (zip) {
            this.zipId = zip.id;
          } else {
            this.zipId = null;
          }
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },
    validateNumber(e) {
      HelperClass.numericInputValidation(e);
    },
    getCourses() {
      HttpVerbs.getRequest(`courses/select/box`)
        .then((res) => {
          let result = res.data.data;
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
      HttpVerbs.getRequest(`courses/${value.value}/sections/select/box`).then(
        (res) => {
          this.$store.state.loader = false;
          let result = res.data.data;
          let status = res.status;
          if (status === 204) {
            this.$noty.warning("متاسفانه فصلی برای این دوره تعریف نشده است");
            return;
          }

          result.forEach((item) => {
            this.sectionArray.push({
              name: item.title,
              value: item.id,
            });
          });
        }
      );
    },
    getVideos(value) {
      this.videosArray = [];
      this.next_video_id = null;
      this.prev_video_id = null;

      if (!value) {
        return;
      }
      HttpVerbs.getRequest(
        `courses/sections/${value.value}/videos/select/box`
      ).then((res) => {
        let result = res.data.data;
        let status = res.status;
        if (status === 204) {
          this.$noty.warning(" ویدیوای برای این فصل پیدا نشد");
          return;
        }
        result.forEach((item) => {
          this.videosArray.push({
            name: item.title,
            value: item.id,
          });
        });
      });
    },

    getData() {
      let formData = new FormData();

      formData.append("title", this.title);

      formData.append("en_title", this.en_title);

      formData.append("meta", this.meta);

      this.slug.trim().length ? formData.append("slug", this.slug) : "";

      formData.append("short_description", this.short_description);

      formData.append("description", this.description);

      formData.append("time_in_minute", this.time_in_minute);

      this.courseId ? formData.append("course_id", this.courseId.value) : "";

      this.sectionId
        ? formData.append("courseSection_id", this.sectionId.value)
        : "";

      this.next_video_id
        ? formData.append("next_video_id", this.next_video_id.value)
        : "";

      this.prev_video_id
        ? formData.append("prev_video_id", this.prev_video_id.value)
        : "";

      formData.append("status", this.status ? 1 : 0);

      formData.append("is_free", this.is_free ? 1 : 0);

      this.$store.state.uploadedVideo
        ? formData.append("videoFileUUID", this.$store.state.uploadedVideo)
        : "";

      this.$store.state.uploadedZip
        ? formData.append("zipFileUUID", this.$store.state.uploadedZip)
        : "";

      return formData;
    },
    submit() {
      let data = this.getData();
      HttpVerbs.putRequest(`videos/${this.$route.params.id}`, data)
        .then(() => {
          HelperClass.showSuccess(this.$noty);
          setTimeout(() => {
            HelperClass.showSuccess(this.$noty);
            close();
          }, 1000);
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },
  },
  components: {
    VideoUploader,
    ZipUploader,
    Editor,
    Multiselect,
    VideoPlayer,
  },
  mounted() {},
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style scoped lang="scss">
@import "~video.js/dist/video-js.min.css";
</style>
