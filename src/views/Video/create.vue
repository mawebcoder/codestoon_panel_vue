<template>
  <div>
    <form enctype="multipart/form-data">

      <md-field>

        <md-file accept="video/mp4" placeholder="برای آپلود ویدیو کلیک کنید..." @change="uploadit($event)" v-model="single" />

      </md-field>

    </form>

  </div>
</template>

<script>
export default {
  name: "create",
  data(){
    return {
      single:''
    }
  },
  methods:{
    uploadit(e){
      console.log(e.target)
    }
  }
}
</script>

<style scoped>

</style>