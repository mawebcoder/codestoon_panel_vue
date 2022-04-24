<template>
  <div>
    <drop-zone @vdropzone-canceled="cancelUpload" @vdropzone-upload-progress="uploadProgress" @vdropzone-removed-file="removeFile" @vdropzone-error="error" @vdropzone-success="uploaded"
               ref="myVueDropzone" id="dropzone"
               :options="dropzoneOptions"/>
  </div>


</template>

<script>
import dropZone from 'vue2-dropzone'
import HelperClass from "../services/HelperClass";

export default {
  name: "DropZon",
  props: {
    driver: {
      type: String,
      required: true
    },
    imageType: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: 'عکس را بکشید و رها کنید'
    },
    settingFileType: {
      type: String,
      default: null
    },
    imageName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dropzoneOptions: {
        url: this.settingFileType ?
            `${this.$store.state.uploadBaseUrl}?driver=${this.driver}&type=${this.imageType}&setting_file_type=${this.settingFileType}` :
            `${this.$store.state.uploadBaseUrl}?driver=${this.driver}&type=${this.imageType}`,
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        maxFilesize: 307200,
        maxFiles: 1,
        timeout: 50000,
        uploadMultiple: false,
        duplicateCheck: 'enabled',
        dictUploadCanceled: 'آپلود توسط شما کنسل شد',
        dictCancelUploadConfirmation: 'آیا اطمینان دارید؟',
        acceptedFiles: 'image/*',
        addRemoveLinks: true,
        chunking: true,
        retryChunks: true,
        retryChunksLimit: 3,
        forceChunking: true,
        chunkSize: 524288,
        dictDefaultMessage: this.message,
        dictFileTooBig: 'سایز فایل نمیتواند بیشتر از 300 کیلوبایت باشد',
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

  
    cancelUpload(){
      this.$store.state.videoUploadProgress = 0;
    },
    uploadProgress(file, progress, bytesSent) {
      this.$store.state.videoUploadProgress = Math.floor((bytesSent / file.size) * 100)

    },
    removeFile() {
     
      this.$store.state.videoUploadProgress = 0;
      if (this.imageName) {
        if (this.$store.state.uploadedImages[this.imageName]) {
          delete this.$store.state.uploadedImages[this.imageName]
        }
      } else {
        this.$store.state.uuid = {}
      }
    },
    uploaded(file) {
      this.$noty.success('آپلود با موفقیت انجام شد')
      if (!this.imageName) {
        this.$store.state.uuid = file.upload.uuid;
      } else {
        this.$store.state.uploadedImages[this.imageName] = file.upload.uuid;
      }

    

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
        this.$noty.error(response.message)
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