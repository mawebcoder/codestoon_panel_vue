<template>
  <div style="margin-top: 10px">

    <form ref="form" class="row justify-content-center align-items-center" enctype="multipart/form-data">


      <div  class="upload-box col-4 col-360-12 col-992-7 col-480-10">
        <md-card>

          <md-card-header>
            <div class="md-title">{{ title }}</div>
            <div style="margin: 11px 0" class="md-subhead">{{ valid_formats_text }}</div>
          </md-card-header>

          <md-card-content style="text-align: left">
               <span @click="removeImage" v-if="show_image">
                 <md-button class="md-raised md-accent">
                                    <md-icon>
                                      delete
                                    </md-icon>
                                  </md-button>
                </span>
            <div class="input-image-box">


              <i>
                <md-icon class="md-size-5x">add_a_photo</md-icon>
              </i>

              <input :accept="validFormats" @change="getImage($event)" type="file">

              <div  :class="[`image-box${file_name}`,'image-box']" v-show="show_image || src">
                <img alt="image" :src="src" v-if="src">
              </div>


            </div>
          </md-card-content>
        </md-card>
      </div>




    </form>


  </div>
</template>

<script>
export default {
  name: "Upload",
  data: () => {
    return {
      show_image: false
    }
  },
  computed: {
    validFormats() {
      return this.valid_formats.join(',')
    }
  },
  props: {
    title: {
      default: 'آپلود فایل',
      type:String
    },
    file_name: {
      require:true,
      type:String
    },
    src: {
      default: false,
      type:[Boolean,String]
    },
    valid_formats_text: {
      default: 'صرفا عکس',
      type:String
    },
    valid_formats: {
      default: () => {
        return ['image/jpeg', 'image/gif', 'image/jpg', 'image/svg', 'image/png']
      },
      type:Array
    },
    valid_size: {
      default: 300, //KB,
      type:Number
    },
  },
  methods: {

    showImagePreview(file) {
      let fileReader = new FileReader();
      let imageBox = document.querySelector(`.image-box${this.file_name}`);
      let old_image = imageBox.querySelector('img');
      if (old_image) {
        old_image.remove();
      }
      fileReader.onload = e => {
        let src = e.target.result;
        let img = document.createElement('img');
        imageBox.insertAdjacentElement('beforeend', img);
        img.src = src
        img.style.width = '100%'
        img.style.height = '100%'
      }

      fileReader.readAsDataURL(file);
      this.show_image = true;

      Object.assign(this.$store.state.image_file,{[this.file_name]:file})
    },
    removeImage() {
      let imageBox = document.querySelector(`.image-box${this.file_name}`);
      imageBox.querySelector('img').remove();
      this.show_image = false;
      this.$refs.form.reset();
      delete this.$store.state.image_file[this.file_name];
    },
    getImage(event) {

      let file = event.target.files[0];
      let type = file['type'];
      let size = file['size'] / (1024) //KB;

      if (!this.valid_formats.includes(type)) {
        let imageBox = document.querySelector(`.image-box${this.file_name}`);
        let old_image = imageBox.querySelector('img');
        if (old_image) {
          old_image.remove();
        }
        delete this.$store.state.image_file[this.file_name];
        this.$noty.warning('فرمت فایل نامعتبر است')
        return;
      }
      if (size > this.valid_size) {
        this.$noty.warning(`حجم فایل نمیتواند بیشتر از ${this.valid_size}کیلوبایت باشد`)
        let imageBox = document.querySelector(`.image-box${this.file_name}`);
        let old_image = imageBox.querySelector('img');
        if (old_image) {
          old_image.remove();
        }
        delete this.$store.state.image_file[this.file_name];
        return;
      }
      this.showImagePreview(file);
    }
  }
}
</script>

<style scoped lang="scss">
.input-image-box {
  height: 300px;
  position: relative;
  display: flex;
  justify-content: center;
  border: 1px solid rgba(167, 167, 167, 0.58);
  border-radius: 4px;

  > i {
    display: block;
    height: 100px;
    width: 100px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .image-box {
    position: relative;
    z-index: 10;
    height: 100%;
    width: 100%;

    img {
      height: 100%;
      width: 100%;
      border-radius: 5px;
      box-shadow: 0 0 4px rgba(167, 167, 167, 0.58);
    }
  }

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    top: 0;
    right: 0;
    cursor: pointer;
  }
}
</style>