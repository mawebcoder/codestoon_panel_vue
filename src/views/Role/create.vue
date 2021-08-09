<template>
  <div>

    <md-field>

      <md-input placeholder="نام نقش به فارسی..." v-model="fa_name"></md-input>
    </md-field>

    <md-field>

      <md-input placeholder="نام نقش به انگلیسی..." v-model="en_name"></md-input>
    </md-field>
    <label >
      مجوز ها :
    </label>
    <multiselect multiple  selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="status"
                 :options="statusOptions" :close-on-select="true"
                 :clear-on-select="false"
                 :preserve-search="true" placeholder="مجوزهای مورد نظر را انتخاب کنید..." label="name"
                 track-by="name">
    </multiselect>

    <md-button @click="submit" class="md-raised md-primary">ثبت</md-button>

  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: "Create",
  data() {
    return {
      fa_name: '',
      en_name: '',
      sort: 0,
      status: {name: 'جدیدترین', value: 1},

      sortOptions: [
        {name: 'جدیدترین', value: 1},
        {name: 'قدیمی ترین', value: 0},
      ],
      statusOptions: [
        {name: 'فعال', value: 1},
        {name: 'غیر فعال', value: 0},
      ],
    }
  },
  methods: {
    getData() {

    },
    makeEmptyValues() {

    },
    submit() {


    },
    showScrollTop() {


    }
  },
  components: {
    Multiselect
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>