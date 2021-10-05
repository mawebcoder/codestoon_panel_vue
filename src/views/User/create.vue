<template>
  <div>

    <label>
      نقش کاربر :
    </label>
    <multiselect style="margin-bottom: 20px" selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="sort"
                 :options="sortOptions" :close-on-select="true"
                 :clear-on-select="false"
                 :preserve-search="true" placeholder="نقش کاربر را انتخاب کنید..." label="name"
                 track-by="name">
    </multiselect>
    <md-field>
      <md-input placeholder="نام و نام خانوادگی..." v-model="name"></md-input>
    </md-field>

    <md-field>

      <md-input placeholder="شماره تلفن..." v-model="cell"></md-input>
    </md-field>

    <md-field>

      <md-input type="email" placeholder="ایمیل..." v-model="email"></md-input>
    </md-field>

    <md-field>


      <md-input type="password" placeholder="تکرار رمز عبور..." v-model="confirm_password"></md-input>
    </md-field>
    <md-field>
      <md-input type="password" placeholder="رمز عبور..." v-model="password"></md-input>

    </md-field>


    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>
    <label>
      عکس پروفایل :
    </label>
    <DropZone :image-type="imageType" :driver="driver"/>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>
  </div>
</template>

<script>
// import HttpVerbs from "../../services/HttpVerbs";
// import HelperClass from "../../services/HelperClass";

const Multiselect = () => import('vue-multiselect');
const DropZone = () => import('../../components/DropZon')
export default {
  name: "Create",
  data() {
    return {
      status: false,
      name: '',
      cell: '',
      driver: 'profile',
      imageType: 'cart',
      email: '',
      password: '',
      confirm_password: '',
      role_id: '',
      sortOptions: [
        {name: 'جدیدترین', value: 1},
        {name: 'قدیمی ترین', value: 0},
      ],
      sort: {name: 'جدیدترین', value: 1},
    }
  },
  methods: {
    getData() {
      let formData = new FormData();
      formData.append('name', this.name);
      formData.append('cell', this.cell);
      formData.append('status', this.status ? 1 : 0);
      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('confirm_password', this.confirm_password);
      formData.append('role_id', this.role_id);
    },
    submit() {
      console.log(this.$store.state.image_file);
    }
  },
  components: {
    Multiselect,
    DropZone
  },
}
</script>

<style scoped>

</style>