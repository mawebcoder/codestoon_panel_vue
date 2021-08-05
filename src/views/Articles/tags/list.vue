<template>
  <div>

<!--    dialog-->
    <md-dialog  :md-active.sync="showDialog">
      <md-dialog-title>حذف آیتم ها</md-dialog-title>

<div style="padding: 10px">
  آیا اطمینان دارید؟
</div>
      <md-dialog-actions>
        <md-button style="margin: 0 10px" @click="showDialog = false" class="md-raised md-accent">بله</md-button>
        <md-button @click="showDialog = false"  class="md-raised md-primary">خیر</md-button>
      </md-dialog-actions>

    </md-dialog>

<!--    table-->
    <vue-good-table
        :fixed-header="true"
        max-height="400px"
        :columns="columns"
        :rtl="true"
        @on-cell-click="onCellClick"
        :rows="rows">
            <div slot="table-actions" style="width: 100%;display: flex;justify-content: center;align-content: center" dir="rtl">
              <md-field style="width: 80%">
                <md-input style="padding: 0 10px" placeholder="جستجو در جدول..." v-model="type"></md-input>
              </md-field>
              <div class="icons">
                <md-button @click="showDialog=true" class="md-icon-button md-accent">
                  <md-icon >delete</md-icon>
                </md-button>
                <md-button class="md-icon-button md-accent">
                  <md-icon>task_alt</md-icon>
                </md-button>
              </div>
            </div>
    </vue-good-table>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      showDialog: false,
      type:'',
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
        {id: 6, name: "John", age: 20 },
      ],
    }
  },
  methods: {
    onCellClick(params) {
      console.log(params)
    },

  }
}
</script>

<style scoped>

</style>