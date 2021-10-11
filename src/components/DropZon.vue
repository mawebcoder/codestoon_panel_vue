<template>
  <div>
    <drop-zone @vdropzone-error="error" @vdropzone-success="uploaded" ref="myVueDropzone" id="dropzone"
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
    }
  },
  data() {
    return {
      dropzoneOptions: {
        url: `${this.$store.state.uploadBaseUrl}?driver=${this.driver}&type=${this.imageType}&setting_file_type=${this.settingFileType}`,
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        maxFilesize: 307200,
        maxFiles: 1,
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
    uploaded(file) {
      this.$noty.success('آپلود با موفقیت انجام شد')
      this.$store.state.uuid = file.upload.uuid;
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