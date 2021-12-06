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
      return {
        code: this.code,
        valid_time_use: this.valid_time_to_use,
        expire_date: this.expire_date,
        status: this.status ? 1 : 0,
        percent: this.percent
      }
    },
    makeEmptyValues() {
      this.code = '';
      this.valid_time_to_use = '';
      this.percent = '';
      this.expire_date = '';
      this.status = false;
    },
    submit() {
      let data = this.getData();
      HttpVerbs.postRequest('discounts', data)
          .then(() => {
            this.makeEmptyValues();
            HelperClass.showSuccess(this.$noty);

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