<template>
  <div>

    <label>
      نقش کاربر :
    </label>
    <multiselect style="margin-bottom: 20px" selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="role"
                 :options="roles" :close-on-select="true"
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


      <md-input type="password" placeholder=" رمز عبور..." v-model="password"></md-input>
    </md-field>
    <md-field>
      <md-input type="password" placeholder="تکرار رمز عبور..." v-model="confirm_password"></md-input>

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

import HelperClass from "../../services/HelperClass";
import HttpVerbs from "../../services/HttpVerbs";

const Multiselect = () => import('vue-multiselect');
const DropZone = () => import('../../components/DropZon')
export default {
  name: "Create",
  created() {
    this.getRoles();
    this.getUserInfo();
  },
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
      role: '',
      roles: [],
    }
  },
  methods: {
    getUserInfo() {
      HttpVerbs.getRequest(`users/${this.$route.params.id}/edit`)
          .then(res => {
            let data = res.data.data;
            let user = data.user;
            let userRole = data.role;
            this.status = user.status === 1;
            this.name = user.name;
            this.email = user.email;
            this.cell = user.cell;
            this.role = {
              value: userRole.id,
              name: userRole.fa_name
            }
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getRoles() {
      HttpVerbs.getRequest('roles/select/box')
          .then(res => {
            this.roles = [];
            let status = res.status;
            if (status === 404) {
              return;
            }
            let data = res.data.data;
            data.forEach(item => {
              this.roles.push({
                value: item.id,
                name: item.fa_name
              })
            })
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getData() {
      let formData = new FormData();
      formData.append('name', this.name);
      formData.append('cell', this.cell);
      formData.append('status', this.status ? 1 : 0);
      formData.append('email', this.email);
      if (this.password.trim().length) {
        formData.append('password', this.password);
        formData.append('confirm_password', this.confirm_password);
      }

      formData.append('role_id', this.role.value);

      if (this.$store.state.uuid) {
        formData.append('uuid', this.$store.state.uuid);
      }
      return formData;
    },
    submit() {
      let data = this.getData();
      HttpVerbs.putRequest(`users/admin/${this.$route.params.id}`, data)
          .then(() => {
            HelperClass.showSuccess(this.$noty)
            close();
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
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