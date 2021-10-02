<template>
  <div>

    <md-card style="margin-bottom: 10px">
      <md-card-header>
        <div class="md-title">فیلتر سازی داده ها</div>
      </md-card-header>

      <md-card-content>
        <div class="filter-section row">

          <!--      item-->
          <div class="col-1 filter-name">
            وضعیت :
          </div>
          <div class="col-5 filter-item">
            <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="status"
                         :options="statusOptions" :close-on-select="true"
                         :clear-on-select="false"
                         :preserve-search="true" placeholder="فیلتر مورد نظر را انتخاب کنید..." label="name"
                         track-by="name">
            </multiselect>
          </div>

        </div>
      </md-card-content>


    </md-card>

    <DataTable editUrlName="edit-managers" :editCallBack="getAdmins" deleteUrl="roles" :deleteCallBack="getAdmins"
               :columns="columns" :rows="rows">
    </DataTable>

  </div>
</template>

<script>
const DataTable = () => import('../../components/DataTable')
import Multiselect from 'vue-multiselect'

export default {
  name: "list",
  data() {
    return {
      showDialog: false,
      page: 1,
      type: '',
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
        },
      ],
      rows: [
        {id: 1, name: "John", age: 20},
        {id: 2, name: "Jane", age: 24},
        {id: 3, name: "Susan", age: 16},
        {id: 4, name: "Chris", age: 55},
        {id: 5, name: "Dan", age: 40},
        {id: 6, name: "John", age: 20},
      ],

      sort: {name: 'جدیدترین', value: 1},
      status: {name: 'فعال', value: 1},

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
    getAdmins() {

    },
    myCallback(value) {
      console.log(value)
    },
    onCellClick(params) {
      console.log(params)
    },
  },
  components: {
    Multiselect,
    DataTable
  },

}
</script>

<style scoped>

</style>