<template>
  <div>
    <drop-zone @vdropzone-canceled="cancelUpload" @vdropzone-upload-progress="uploadProgress"
               @vdropzone-removed-file="removeFile" @vdropzone-error="error"
               @vdropzone-success="uploaded"
               ref="myVueDropzone" id="dropzone"
               :options="dropzoneOptions"/>

    <div style="direction: ltr;margin-top: 10px">
      <md-progress-bar md-mode="determinate" :md-value="$store.state.videoUploadProgress"></md-progress-bar>
    </div>
  </div>

</template>

<script>
import dropZone from 'vue2-dropzone'
import HelperClass from "../services/HelperClass";

export default {
  name: "DropZon",
  data() {
    return {
      dropzoneOptions: {
        url: `${this.$store.state.videoUploadBaseUrl}?driver=mp4&type=video&token=${this.$cookies.get('token')}`,
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        maxFilesize: 471859200,
        maxFiles: 1,
        timeout: 50000,
        uploadMultiple: false,
        duplicateCheck: 'enabled',
        dictUploadCanceled: 'آپلود توسط شما کنسل شد',
        dictCancelUploadConfirmation: 'آیا اطمینان دارید؟',
        acceptedFiles: 'video/mp4',
        addRemoveLinks: true,
        chunking: true,
        retryChunks: true,
        retryChunksLimit: 10,
        forceChunking: true,
        chunkSize: 524288,
        dictRemoveFileConfirmation: 'آیا اطمینان دارید؟',
        dictDefaultMessage: 'آپلود ویدیو',
        dictFileTooBig: 'سایز فایل نمیتواند بیشتر از ۴۵۰ مگابایت باشد',
        dictFallbackMessage: 'مرورگر شما از این نسخه از dropzone  پشتیبانی نمیکند',
        headers: {"My-Awesome-Header": "header value"},
        dictCancelUpload: 'انصراف',
        dictRemoveFile: 'حذف',
        renameFile: (file) => {

          let type = file['type'].split('/')[1];

          let random_file_name = HelperClass.makeRandomString(20);

          return random_file_name + '.' + type
        },
      },
    }
  },
  methods: {
    cancelUpload() {
      this.$store.state.videoUploadProgress = 0;
    },
    uploadProgress(file, progress, bytesSent) {
      this.$store.state.videoUploadProgress = Math.floor((bytesSent / file.size) * 100)
    },
    removeFile() {
      this.$store.state.videoUploadProgress = 0;
      this.$store.state.uploadedVideo = null
    },
    uploaded(file) {

      this.$noty.success('آپلود با موفقیت انجام شد')

      this.$store.state.uploadedVideo = file.upload.uuid;

    },
    error(file, response) {

      if (typeof response.errors !== "undefined") {
        let messages = response.errors;

        for (let i in messages) {

          let message = messages['' + i][0]
          this.$noty.error(message, {
            timeout: 3000,
            layout: 'topRight'
          })
        }
      } else {
        if (typeof response.message !== 'undefined') {
          this.$noty.error(response.message)

        } else {
          this.$noty.info(response)
        }
      }

    }
  },
  components: {
    dropZone
  },
}
</script>

<style scoped>

</style>