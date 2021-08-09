<template>
  <div>

    <md-field>

      <md-input placeholder="کد مورد نظر..." v-model="fa_name"></md-input>
    </md-field>

    <md-field>


      <md-input type="number" placeholder="درصد تخفیف..." v-model="en_name"></md-input>
    </md-field>

    <md-field>


      <md-input type="number" placeholder="دفعات مجاز استفاده..." v-model="en_name"></md-input>
    </md-field>
    <label>
      تاریخ انقضا :
    </label>

    <custom-date-picker v-model="date"></custom-date-picker>

    <div dir="ltr">
      <md-switch v-model="status"></md-switch>
    </div>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>

  </div>
</template>

<script>
export default {
  name: "Create",
  data() {
    return {
      status: false,
      fa_name: '',
      en_name: '',
      sortOptions: [
        {name: 'جدیدترین', value: 1},
        {name: 'قدیمی ترین', value: 0},
      ],
      sort: {name: 'جدیدترین', value: 1},
    }
  },

  methods: {
    getData() {
    },
    makeEmptyValues() {
      this.fa_name = '';
      this.en_name = '';
      this.status = false;
    },
    submit() {

    },
    showScrollTop() {


    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>