<template>
  <div>
    <md-dialog
      style="padding: 20px"
      :md-fullscreen="true"
      :md-active.sync="showDialog"
    >
      <md-dialog-title>تایید کد</md-dialog-title>

      <label>
        کد تایید به شماره تماس و ایمیل شما ارسال شد :
      </label>
      <md-field>
        <md-input placeholder="کد تایید..." v-model="verify_code"></md-input>
      </md-field>
      <md-dialog-actions>
        <md-button
          style="margin: 0 10px"
          @click="submitDialog"
          class="md-raised md-accent"
          >تایید</md-button
        >
        <md-button @click="showDialog = false" class="md-raised md-primary"
          >انصراف</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <label>
      نام و نام خانوادگی :
    </label>
    <md-field>
      <md-input placeholder="نام و نام خانوادگی..." v-model="name"></md-input>
    </md-field>

    <label>
      شماره تماس :
    </label>
    <md-field>
      <md-input placeholder="شماره تلفن..." v-model="cell"></md-input>
    </md-field>

    <label>
      ایمیل :
    </label>
    <md-field>
      <md-input type="email" placeholder="ایمیل..." v-model="email"></md-input>
    </md-field>

    <label>
      رمز فعلی :
    </label>

    <md-field>
      <md-input
        type="password"
        placeholder="رمز فعلی..."
        v-model="currentPassword"
      ></md-input>
    </md-field>

    <label>
      رمز عبور جدید:
    </label>
    <md-field>
      <md-input
        type="password"
        placeholder=" رمز عبور جدید..."
        v-model="password"
      ></md-input>
    </md-field>

    <label>
      تکرار رمز عبور:
    </label>
    <md-field>
      <md-input
        type="password"
        placeholder="تکرار رمز عبور..."
        v-model="confirm_password"
      ></md-input>
    </md-field>

    <label>
      عکس پروفایل :
    </label>
    <md-card v-if="$store.state.profileImage">
      <img :src="$store.state.profileImage.webp_path" alt="profileImage" />
    </md-card>
    <md-card v-else>
      فاقد عکس پروفایل
    </md-card>

    <div style="margin: 20px 0;text-align: center">
      آپلود عکس جدید پروفایل :
    </div>

    <DropZone :image-type="imageType" :driver="driver" />

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>
  </div>
</template>

<script>
import HttpVerbs from "../../services/HttpVerbs";
import HelperClass from "../../services/HelperClass";
const DropZone = () => import("../../components/DropZon");
export default {
  name: "index",
  created() {
    this.getLastData();
  },
  data() {
    return {
      name: "",
      cell: "",
      currentPassword: "",
      driver: "profile",
      imageType: "cart",
      email: "",
      password: "",
      confirm_password: "",
      profileImage: "",
      showDialog: false,
      verify_code: "",
    };
  },
  methods: {
    getLastData() {
      let userInfo = this.$store.state.user_info;
      this.cell = userInfo.cell;
      this.email = userInfo.email;
      this.name = userInfo.name;
    },
    getData() {
      let formData = new FormData();
      formData.append("cell", this.cell);
      formData.append("email", this.email);
      formData.append("name", this.name);
      if (this.password.trim().length) {
        formData.append("password", this.password);
        formData.append("confirm_password", this.confirm_password);
        formData.append("currentPassword", this.currentPassword);
      }
      if (this.$store.state.uuid) {
        formData.append("uuid", this.$store.state.uuid);
      }
      return formData;
    },
    showOwnerShipDialog() {
      HttpVerbs.postRequest("users/personal/verify/code/send")
        .then((res) => {
          let message = res.data.message;
          this.$noty.info(message);
          this.$store.state.loader = false;
          this.showDialog = true;
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },
    submitDialog() {
      let formData = new FormData();
      formData.append("code", this.verify_code);
      HttpVerbs.postRequest("users/personal/verify/code/get", formData)
        .then((res) => {
          let temporaryPassword = res.data.data;
          this.$cookies.set("temporaryPassword", temporaryPassword, 60 * 10);
          HttpVerbs.putRequest("users/personal/update", this.getData())
            .then(() => {
              this.showDialog = false;
              HelperClass.showSuccess(this.$noty);
            })
            .catch((error) => {
              HelperClass.showErrors(error, this.$noty);
            });
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
          this.showDialog = false;
        });
    },
    submit() {
      if (!this.$cookies.get("temporaryPassword")) {
        this.showOwnerShipDialog();
      } else {
        let data = new FormData();
        data.append(
          "temporaryPassword",
          this.$cookies.get("temporaryPassword")
        );

        HttpVerbs.postRequest("auth/temporaryPassword/verify", data)
          .then(() => {
            HttpVerbs.putRequest("users/personal/update", this.getData())
              .then(() => {
                HelperClass.showSuccess(this.$noty);
                location.reload();
              })
              .catch((error) => {
                HelperClass.showErrors(error, this.$noty);
              });
          })
          .catch(() => {
            this.$cookies.remove("temporaryPassword");
            this.showOwnerShipDialog();
          });
      }
    },
  },
  components: {
    DropZone,
  },
};
</script>

<style scoped></style>
