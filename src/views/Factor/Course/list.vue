<template>
  <div>
    <md-card style="margin-bottom: 10px">
      <md-card-header>
        <div class="md-title">فیلتر سازی داده ها</div>
      </md-card-header>

      <md-card-content>
        <div class="filter-section row">

          <!--      item-->
          <div class="col-2 filter-name">
            مرتب سازی :
          </div>
          <div class="col-4 filter-item">
            <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="sort" :options="sortOptions"
                         :close-on-select="true" :clear-on-select="false"
                         :preserve-search="true" placeholder="فیلتر مورد نظر را انتخاب کنید..." label="name"
                         track-by="name">
            </multiselect>
          </div>

          <!--      item-->
          <div class="col-2 filter-name">
            وضعیت رسیدگی :
          </div>
          <div class="col-4 filter-item">
            <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="status"
                         :options="statusOptions" :close-on-select="true"
                         :clear-on-select="false"
                         :preserve-search="true" placeholder="فیلتر مورد نظر را انتخاب کنید..." label="name"
                         track-by="name">
            </multiselect>
          </div>


          <!--      item-->
          <div class="col-2 filter-name">
            وضعیت پرداخت :
          </div>
          <div class="col-4 filter-item">
            <multiselect selectedLabel=" " selectLabel="انتخاب " deselectLabel="حذف" v-model="status"
                         :options="statusOptions" :close-on-select="true"
                         :clear-on-select="false"
                         :preserve-search="true" placeholder="فیلتر مورد نظر را انتخاب کنید..." label="name"
                         track-by="name">
            </multiselect>
          </div>

          <!--      item-->
          <div class="col-2 filter-name">
            دوره :
          </div>
          <div class="col-4 filter-item">
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

    <!--    table-->
    <md-card>
      <md-card-content>
        <DataTable :items="rows" :editUrlName="edit_url_name" deleteUrl="roles" :columns="columns">
        </DataTable>
      </md-card-content>
    </md-card>

  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import DataTable from "../../../components/DataTable";

export default {
  name: "list",
  data() {
    return {
      showDialog: false,
      edit_url_name: 'role-edit',
      editUrl: '',
      rows: ['id', 'name', 'fa_name'],
      columns: [
        {
          label: 'شناسه',
          field: 'id',
        },
        {
          label: 'عنوان فارسی',
          field: 'fa_name',
        },
        {
          label: 'عنوان انگلیسی',
          field: 'name',
        },
        {
          label: 'حذف',
          field: 'delete',
          html: true
        },
        {
          label: 'ویرایش',
          field: 'edit',
          html: true
        },
        {
          label: 'انتخاب',
          field: 'select',
          html: true
        }
      ],
      type: '',
      sort: 0,
      status: 0,

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