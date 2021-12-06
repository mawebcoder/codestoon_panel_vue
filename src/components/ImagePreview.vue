<template>
  <div>
    <md-dialog :md-active.sync="show_dialog">
      <md-dialog-title>حذف آیتم ها</md-dialog-title>

      <div style="padding: 10px">
        آیا اطمینان دارید؟
      </div>
      <md-dialog-actions>
        <md-button style="margin: 0 10px" @click="removeImage" class="md-raised md-accent">بله</md-button>
        <md-button @click="show_dialog = false" class="md-raised md-primary">خیر</md-button>
      </md-dialog-actions>

    </md-dialog>


    <div v-if="image">
      <div style="margin: 20px 0;font-weight: bold;text-align: center">
        {{ title }}
      </div>
      <md-card>
        <div>
          <md-button @click="showDialog" class="md-raised md-accent">حذف</md-button>
        </div>
        <img :src="image" alt="عکس کاور">
      </md-card>
    </div>
    <div v-else style="margin: 20px 0;font-weight: bold;text-align: right">
      {{ NotImageFound }}
    </div>


  </div>
</template>

<script>
import HttpVerbs from "../services/HttpVerbs";
import HelperClass from "../services/HelperClass";

export default {
  name: "Image",
  props: {
    title: {
      default: 'عکس کاور',
      type: String
    },
    image: {
      default: null,
      type: String
    },
    imageId: {
      default: null
    },
    NotImageFound: {
      default: null,
      type: String
    },
    callBack: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      show_dialog: false,
    }
  },
  methods: {

    showDialog() {
      this.show_dialog = true
    },
    removeImage() {
      this.show_dialog = false;
      HttpVerbs.deleteRequest(`upload/delete/${this.imageId}`)
          .then(() => {
            HelperClass.showSuccess(this.$noty, false)
            this.callBack();
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
  }
}
</script>

<style scoped>

</style>