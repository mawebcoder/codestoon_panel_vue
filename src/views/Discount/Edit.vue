<template>
  <div>

    <md-field>

      <md-input placeholder="کد مورد نظر..." v-model="code"></md-input>
    </md-field>

    <md-field>


      <md-input @keydown="validateInput($event),validateDiscount($event)" type="number" placeholder="درصد تخفیف..."
                v-model="percent"></md-input>
    </md-field>

    <md-field>


      <md-input @keydown="validateInput($event)" type="number" placeholder="دفعات مجاز استفاده..."
                v-model="valid_time_to_use"></md-input>
    </md-field>
    <label>
      تاریخ انقضا :
    </label>

    <custom-date-picker v-model="expire_date"></custom-date-picker>

    {{ toLocalDate }}
    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>

  </div>
</template>

<script>
import HttpVerbs from "../../services/HttpVerbs";
import HelperClass from "../../services/HelperClass";

export default {
  name: "Create",
  created() {
    this.getInfo()
  },
  data() {
    return {
      status: false,
      code: '',
      percent: '',
      valid_time_to_use: '',
      expire_date: '',
    }
  },
  computed: {
    toLocalDate() {

      return this.expire_date.trim().length ?
          new Date(this.expire_date).toLocaleDateString('fa-IR') :
          '';

    }
  },

  methods: {
    validateInput(e) {
      HelperClass.numericInputValidation(e);
    },
    validateDiscount(e) {
      HelperClass.discountValidationValue(e)
    },
    getData() {
      let formData = new FormData();
      formData.append('code', this.code);
      formData.append('valid_time_use', this.valid_time_to_use);
      formData.append('expire_date', this.expire_date);
      formData.append('status', this.status ? 1 : 0);
      formData.append('percent', this.percent)
      return formData;
    },
    getInfo() {
      HttpVerbs.getRequest('discounts/' + this.$route.params.id + '/edit')
          .then(res => {
            let data = res.data.data;
            this.expire_date = data.expire_date;
            this.code = data.code;
            this.percent = data.percent;
            this.status = parseInt(data.status) === 1;
            this.valid_time_to_use = data.valid_time_use;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    submit() {
      let data = this.getData();
      HttpVerbs.putRequest('discounts/' + this.$route.params.id, data)
          .then(() => {
            HelperClass.showSuccess(this.$noty);
            close()
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>