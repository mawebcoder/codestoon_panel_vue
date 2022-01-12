<template>
  <div>
    <label style="font-weight:bold">
      عنوان ایمیل(subject)
    </label>
    <md-field>
      <md-input placeholder="subject" v-model="subject"></md-input>
    </md-field>

    <label style="font-weight:bold">
      محتوای ایمیل :
    </label>

    <editor
      v-model="content"
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

    <div class="form-group">
      <label style="font-weight: bold">
        کاربران هدف :
      </label>
    </div>

    <div class="form-group">
      <input
        style="width: 25px;height: 25px;cursor: pointer"
        type="radio"
        name="group"
        value="all"
        v-model="target"
      />
      تمام کاربران
    </div>
    <div class="form-group">
      <input
        style="width: 25px;height: 25px;cursor: pointer"
        type="radio"
        name="group"
        value="unpaidLastWeek"
        v-model="target"
      />
      کاربرانی که در هفته گذشته رکورد پرداخت نشده داشتند
    </div>
    <div class="form-group">
      <input
        style="width: 25px;height: 25px;cursor: pointer"
        type="radio"
        name="group"
        value="chosen"
        v-model="target"
      />
      کاربران انتخابی
    </div>
    <div style="margin: 20px 0"></div>

    <template v-if="target === 'chosen'">
      <multiselect
        @search-change="getUser"
        selectedLabel=" "
        multiple
        selectLabel="انتخاب "
        deselectLabel="حذف"
        v-model="selectedUsers"
        :options="users"
        :close-on-select="true"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="کاربران هدف خود را انتخاب نمایید..."
        label="name"
        track-by="name"
      >
      </multiselect>
    </template>

    <label style="display: block;margin-top: 30px;font-weight: bold">
      آیا ایمیل ها همین الان ارسال شوند؟
    </label>
    <div dir="ltr">
      <md-switch v-model="sendNow"></md-switch>
    </div>

    <template v-if="!sendNow">
      <label style="margin: 10px 0;font-weight: bold">
        تاریخ ارسال را مشخص نمایید :
      </label>

      <div dir="ltr">
        <custom-date-picker
          type="datetime"
          v-model="send_date"
        ></custom-date-picker>
      </div>

      <span
        v-if="toLocalDate.length"
        style="display: inline-block;padding: 10px;border-radius: 5px;background-color:#479cb7;font-weight: bold;margin: 10px"
      >
        {{ toLocalDate }}
      </span>
    </template>
    <md-button
      style="display: block"
      @click="submit"
      class="md-raised md-primary"
      >ثبت</md-button
    >
  </div>
</template>

<script>
import HttpVerbs from "../../../services/HttpVerbs";
import HelperClass from "../../../services/HelperClass";

const Editor = () => import("@tinymce/tinymce-vue");
const Multiselect = () => import("vue-multiselect");

export default {
  data() {
    return {
      subject: "",
      content: "",
      sendNow: true,
      send_date: "",
      target: "",
      users: [],
      selectedUsers: [],
    };
  },
  methods: {
    getUser(value) {
      if (value.length > 3 && value.length <= 30) {
        HttpVerbs.postRequest("sms/search/users", {
          value,
        })
          .then((res) => {
            this.users = [];
            let data = res.data.data;
            if (res.status === 204) {
              this.users = [];
              return;
            }
            data.forEach((value) => {
              this.users.push({ name: value.email, value: value.id });
            });
            this.$store.state.loader = false;
          })
          .catch((error) => {
            HelperClass.showErrors(error, this.$noty);
          });
      }
    },
    getChosenUsers() {
      let chosenUsersIds = [];
      this.selectedUsers.forEach((value) => {
        chosenUsersIds.push(value.value);
      });
      return chosenUsersIds;
    },
    submit() {
      if (this.subject.trim().length < 5) {
        this.$noty.warning(
          "حداقل کاراکتر برای عنوان ایمیل باید ۵ کاراکتر باشد"
        );
        return;
      }

      if (this.content.trim().length < 10) {
        this.$noty.warning("حداقل کاراکتر محتوا باید ۱۰ کاراکتر باشد");
        return;
      }

      /*validate target*/
      if (!this.target || this.target.trim().length === 0) {
        this.$noty.warning("کاربران هدف برای ارسال پیام را انتخاب کنید");
        return;
      }
      if (!this.sendNow && !this.send_date.length) {
        this.$noty.warning("تاریخ ارسال را مشخص کنید");
        return;
      }
      /*validate target default values*/
      if (!["chosen", "unpaidLastWeek", "all"].includes(this.target)) {
        this.$noty.error("invalid data for target users values");
        return;
      }
      if (this.target === "chosen" && !this.selectedUsers.length) {
        this.$noty.warning("کاربری انتخاب نشده است");
        return;
      }

      /*get data*/
      let data = {
        target: this.target,
        ids: this.getChosenUsers(),
        date: this.sendNow ? "now" : this.send_date,
        content: this.content,
        subject: this.subject,
      };
      HttpVerbs.postRequest("/emails/send", data)
        .then(() => {
          HelperClass.showSuccess(this.$noty);
          this.makeEmptyValues()
        })
        .catch((error) => {
          HelperClass.showErrors(error, this.$noty);
        });
    },
    makeEmptyValues() {
      this.subject = "";
      this.content = "";
      this.users = [];
      this.selectedUsers = [];
      this.sendNow = true;
      this.send_date = "";
      this.target = "";
    },
  },
  computed: {
    toLocalDate() {
      if (this.send_date.trim().length) {
        let hour = new Date(this.send_date).getHours();

        let min = new Date(this.send_date).getMinutes();

        return (
          hour +
          ":" +
          min +
          " " +
          new Date(this.send_date).toLocaleDateString("fa-IR")
        );
      }
      return "";
    },
  },
  components: {
    Editor,
    Multiselect,
  },
};
</script>
