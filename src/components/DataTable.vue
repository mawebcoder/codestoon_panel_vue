<template>
  <div>

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
          <md-card>


            <md-card-content>
              <md-field style="width: 100%;direction: ltr">
                <md-icon style="position: relative;bottom: 2px">search</md-icon>
                <md-input style="padding: 0 10px" placeholder="جستجو..." v-model="search"></md-input>
              </md-field>

              <div class="icons">
                <md-button @click="clickToDeleteSelected" class="md-raised md-accent">
                  <md-icon>delete</md-icon>
                </md-button>
                <md-button class="md-raised md-primary">
                  <md-icon>task_alt</md-icon>
                </md-button>
              </div>
            </md-card-content>


          </md-card>
        </div>


      </div>
    </vue-good-table>

    <md-dialog :md-active.sync="$store.state.show_confirmation_dialog">
      <md-dialog-title>حذف آیتم ها</md-dialog-title>

      <div style="padding: 10px">
        آیا اطمینان دارید؟
      </div>
      <md-dialog-actions>
        <md-button style="margin: 0 10px" @click="deleteItems" class="md-raised md-accent">بله</md-button>
        <md-button @click="$store.state.show_confirmation_dialog = false" class="md-raised md-primary">خیر</md-button>
      </md-dialog-actions>

    </md-dialog>
  </div>
</template>

<script>
import HttpVerbs from "../services/HttpVerbs";
import HelperClass from "../services/HelperClass";

export default {
  name: "DataTable",
  data() {
    return {
      selectedIds: [],
      search: '',
      is_single_delete: true,
    }
  },
  props: {
    columns: Array,
    rows: Array,
    ids: Array,
    deleteUrl: String,
    deleteCallBack: Function,
    editCallBack: Function,
    editUrl: String,
  },
  methods: {
    clickToDeleteSelected() {
      this.$store.state.show_confirmation_dialog = true;
      this.is_single_delete = false;
    },
    onCellClick(params) {
      let columnName = params.column.field;
      this.params = params;
      switch (columnName) {
        case 'delete':
          if (params.event.target.tagName === 'SPAN') {
            this.is_single_delete = true;
            this.$store.state.show_confirmation_dialog = true;
          }
          break;
        case 'edit':
          if (params.event.target.tagName === 'SPAN') {
            this.edit();
          }

          break;
        case 'select':
          if (params.event.target.tagName === 'INPUT') {
            this.select(params)
          }
          break;
      }
    },
    deleteItems() {
      this.$store.state.loader = true;
      let ids = [];
      if (this.is_single_delete) {
        ids = [this.params.row.id];
      } else {
        ids = this.selectedIds;
      }
      HttpVerbs.deleteRequest(this.deleteUrl, {ids: ids})
          .then(() => {
            this.deleteCallBack();
            HelperClass.showSuccess(this.$noty)
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    select(params) {
      let checkBoxElement = params.event.target;
      if (checkBoxElement.checked) {
        this.selectedIds.push(parseInt(checkBoxElement.value))
        return
      }
      let index = this.selectedIds.indexOf(parseInt(checkBoxElement.value))
      this.selectedIds.splice(index, 1);
    },

  }
}
</script>

<style scoped>

</style>