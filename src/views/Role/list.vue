<template>
  <div>

    <md-card style="margin-bottom: 10px">
      <md-card-header>
        <div class="md-title">فیلترسازی داده ها</div>
      </md-card-header>

      <md-card-content>
        <div class="filter-section row">
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


    <!--    dialog-->
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>حذف آیتم ها</md-dialog-title>

      <div style="padding: 10px">
        آیا اطمینان دارید؟
      </div>
      <md-dialog-actions>
        <md-button style="margin: 0 10px" @click="showDialog = false" class="md-raised md-accent">بله</md-button>
        <md-button @click="showDialog = false" class="md-raised md-primary">خیر</md-button>
      </md-dialog-actions>

    </md-dialog>


    <!--    table-->
    <md-card>


      <md-card-content>
        <!--    table-->
        <vue-good-table
            :fixed-header="true"
            max-height="400px"
            :columns="columns"
            :rtl="true"
            @on-cell-click="onCellClick"
            :rows="rows">

          <div slot="table-actions" style="width: 100%;display: flex;justify-content: center;align-content: center"
               dir="rtl">
            <div class="col-12">
              <md-card >


                <md-card-content>
                  <md-field style="width: 100%;direction: ltr">
                    <md-icon style="position: relative;bottom: 2px">search</md-icon>
                    <md-input style="padding: 0 10px" placeholder="جستجو..." v-model="type"></md-input>
                  </md-field>

                  <div class="icons">
                    <md-button @click="showDialog=true" class="md-raised md-accent">
                      <md-icon>delete</md-icon>
                    </md-button>
                    <md-button class="md-raised md-primary"><md-icon>task_alt</md-icon></md-button>
                  </div>
                </md-card-content>


              </md-card>
            </div>


          </div>
        </vue-good-table>
      </md-card-content>

    </md-card>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: "list",
  data() {
    return {
      showDialog: false,

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
    onCellClick(params) {
      console.log(params)
    },
  },
  components: {
    Multiselect
  },

}
</script>

<style scoped>

</style>