<template>
  <div>


    <vue-good-table
        :fixed-header="false"
        max-height="400px"
        :columns="FinalColumns"
        :rtl="true"
        @on-cell-click="onCellClick"
        :rows="rows">


      <template v-if="showDelete || showSearch">
        <div slot="table-actions" style="width: 100%;display: flex;justify-content: center;align-content: center"
             dir="rtl">
          <div class="col-12">
            <md-card>


              <md-card-content>

                <h4 style="font-weight: bold;font-size: 1.5em;color: #575757">فیلتر داده ها</h4>
                <!--                search-->
                <template v-if="showSearch">

                  <div v-for="(value,index) in searchInputItems" :key="index" class="form-group">

                    <template v-if="value.input_type==='text'">
                      <div class="form-group" style="margin-bottom: 10px">
                        <md-field>
                          <md-input :placeholder="value.title"
                                    v-model="vModels[index]"></md-input>
                        </md-field>
                      </div>
                    </template>

                    <template v-else-if="value.input_type==='number'">
                      <md-field>
                        <md-input @keydown="validateNumber($event)" type="number" :placeholder="value.title"
                                  v-model="vModels[index]"></md-input>
                      </md-field>
                    </template>
                    <template v-else-if="value.input_type==='select'">
                      <template v-if="typeof(value.multiple)!='undefined' && value.multiple">
                        <label>
                          {{ value.title }}:
                        </label>
                        <multiselect @search-change="getUpdatedValueFromServer($event,index)" multiple
                                     style="margin-bottom: 20px"
                                     selectedLabel=" "
                                     selectLabel="انتخاب " deselectLabel="حذف"
                                     v-model="vModels[index]"
                                     :options="options[index]" :close-on-select="true"
                                     :clear-on-select="false"
                                     :loading="isLoading"
                                     :preserve-search="true" :placeholder="value.title" label="name"
                                     track-by="name">
                        </multiselect>
                      </template>
                      <template v-else>
                        <label>
                          {{ value.title }}:
                        </label>
                        <multiselect @@search-change="getUpdatedValueFromServer($event,index)"
                                     style="margin-bottom: 20px"
                                     selectedLabel=" "
                                     :loading="isLoading"
                                     selectLabel="انتخاب " deselectLabel="حذف"
                                     v-model="vModels[index]"
                                     :options="options[index]" :close-on-select="true"
                                     :clear-on-select="false"
                                     :preserve-search="true" :placeholder="value.title" label="name"
                                     track-by="name">
                        </multiselect>
                      </template>

                    </template>
                    <template v-else-if="value.input_type==='check'">
                      <label>
                        {{ value.title }}:
                      </label>
                      <multiselect style="margin-bottom: 20px" selectedLabel=" " selectLabel="انتخاب "
                                   deselectLabel="حذف"
                                   v-model="vModels[index]"
                                   :options="options[index]" :close-on-select="true"
                                   :clear-on-select="false"
                                   :preserve-search="true" :placeholder="value.title" label="name"
                                   track-by="name">
                      </multiselect>
                    </template>
                    <template v-else-if="value.input_type==='sort'">
                      <label>
                        {{ value.title }}:
                      </label>
                      <multiselect style="margin-bottom: 20px" selectedLabel=" " selectLabel="انتخاب "
                                   deselectLabel="حذف"
                                   v-model="vModels[index]"
                                   :options="options[index]" :close-on-select="true"
                                   :clear-on-select="false"
                                   :preserve-search="true" :placeholder="value.title" label="name"
                                   track-by="name">
                      </multiselect>
                    </template>


                  </div>
                  <div class="form-group d-flex">
                    <div class="col-1">
                      <md-button @click="filterData" class="md-raised md-primary">اعمال فیلتر</md-button>
                    </div>
                    <div class="col-1">
                      <md-button @click="removeFilters" class="md-raised">حذف فیلتر</md-button>
                    </div>
                  </div>

                </template>

                <!--                end search-->


                <!--                delete box-->
                <template v-if="showDelete">
                  <div class="icons">
                    <md-button @click="clickToDeleteSelected" class="md-raised md-accent">
                      <md-icon>delete</md-icon>
                    </md-button>
                  </div>
                </template>
                <!--      end        delete -->


              </md-card-content>


            </md-card>
          </div>


        </div>

      </template>
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
import Multiselect from "vue-multiselect";

export default {
  name: "DataTable",
  created() {
    this.getSearchInputItems();
  },
  data() {
    return {
      selectedIds: [],
      search: '',
      rows: [],
      lastPage: '',
      searchResult: [],
      modelName: '',
      FinalColumns: [],
      filterDataServiceRoute: 'search',
      fixed_columns: [
        {
          label: 'حذف',
          field: 'delete',
          html: true,
          hidden: !this.showDelete
        },
        {
          label: 'ویرایش',
          field: 'edit',
          html: true,
          hidden: !this.showEdit
        },
        {
          label: 'مشاهده',
          field: 'see',
          html: true,
          hidden: !this.showSeeMore
        },
        {
          label: 'انتخاب',
          field: 'select',
          html: true,
          hidden: !this.showSelect
        }
      ],
      is_single_delete: true,
      searchInputItems: [],
      vModels: [],
      options: [],
      isLoading: false
    }
  },
  props: {
    columns: Array,
    deleteUrl: String,
    editUrlName: String,
    items: Array,
    uri: String,
    showSeeMore: {
      default: false,
      type: Boolean
    },

    showSearch: {
      default: true,
      type: Boolean
    },
    showEdit: {
      default: true,
      type: Boolean
    },
    showDelete: {
      default: true,
      type: Boolean
    },
    showSelect: {
      default: true,
      type: Boolean
    },
    serverSearchRoute: {
      default: null,
      type: String
    }
  },
  methods: {
    getUpdatedValueFromServer(searchQuery, index) {

      let data = {
        model: this.searchInputItems[index].modelClass,
        value: searchQuery,
        title: this.searchInputItems[index].COLUMN_NAME
      }
      this.isLoading = true;
      HttpVerbs.postRequest('search/select-box', data, false)
          .then(res => {
            this.options[index] = [];
            let result = res.data.data;
            if (res.status === 204) {
              this.options[index] = [];
              this.isLoading = false
              return;
            }
            result.forEach(item => {
              this.options[index].push({name: item.fa_name, value: item.id})
            })
            this.$forceUpdate();
            this.isLoading = false;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },

    removeFilters() {

      this.searchInputItems.forEach((value, index) => {

        this.vModels[index] = null

      })

      this.$forceUpdate();

      this.filterData();
    },
    validateNumber(e) {
      HelperClass.numericInputValidation(e)
    },

    /*filter data*/
    filterData() {

      this.$forceUpdate();

      let data = {};
      let key;
      let multipleValues;
      this.searchInputItems.forEach((value, index) => {

        key = this.getSearchKeyName(value)

        switch (value.input_type) {
          case 'text':

            Object.assign(data, {[key]: this.vModels[index]})

            break;
          case "select":
            if (typeof value.multiple == 'undefined') {
              Object.assign(data, {[key]: this.vModels[index] ? this.vModels.value : null})
            } else {
              multipleValues = this.vModels[index] ? this.getMultipleValues(this.vModels[index]) : null;
              Object.assign(data, {[key]: multipleValues})
            }
            break;
          case 'check':
            Object.assign(data, {[key]: this.vModels[index] ? this.vModels[index].value : null})
            break;
          case 'sort':
            Object.assign(data, {[key]: this.vModels[index] ? this.vModels[index].value : null})
            break;
          case 'number':
            Object.assign(data, {[key]: this.vModels[index]})
            break;
        }
      })


      data = Object.assign(data, {model: this.modelName})

      this.sendSearchRequest(data);

    },

    sendSearchRequest(data) {

      HttpVerbs.postRequest(this.filterDataServiceRoute, data)
          .then(res => {
            this.$store.state.loader = false;
            this.searchResult=res.data.data.data;
            this.lastPage=res.data.data.last_page;
            this.tableRender();
          }).catch(error => {

        HelperClass.showErrors(error, this.$noty)

      })
    },

    getMultipleValues(multipleValue) {
      let result = [];

      multipleValue.forEach(item => {
        result.push(item.value)
      })
      return result;
    },

    getSearchKeyName(value) {

      let key = value.table_name + "-" + value.COLUMN_NAME + "-" + value.input_type + "-" + value.operation_type;

      if (typeof value.multiple != 'undefined') {
        key += "-" + 'multiple'
      }

      return key;

    },


    getSearchInputItems() {
      HttpVerbs.getRequest(this.serverSearchRoute)
          .then(res => {
            this.searchInputItems = res.data.data.inputs;
            this.modelName = res.data.data.model;
            this.searchInputItems.forEach((value, index) => {

              switch (value.input_type) {
                case 'text':
                  this.vModels[index] = '';
                  break;
                case "select":
                  this.vModels[index] = null;
                  this.options[index] = []
                  break;
                case 'check':
                  this.options[index] = typeof value.values != "undefined" ? this.getSortAndCheckValues(value.values) : [];
                  this.vModels[index] = null
                  break;
                case 'sort':
                  this.options[index] = typeof value.values != "undefined" ? this.getSortAndCheckValues(value.values) : [];
                  this.vModels[index] = null
                  break;
                case 'number':
                  this.vModels[index] = ''
                  break;
              }

              this.filterData();

            })
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },

    getSortAndCheckValues(value) {
      let result = [];
      for (let i in value) {

        result.push({name: "" + i, value: value["" + i]})
      }
      return result;
    },
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
            this.edit(params);
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

            this.tableRender();
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

    edit(params) {
      let id = params.row.id;
      let url = this.$router.resolve({name: this.editUrlName, params: {id: id}}).href;
      open(url)
    },

    resetColumns() {
      this.FinalColumns = this.columns.concat(this.fixed_columns)
    },
    tableRender() {
      this.selectedIds = [];
      this.resetColumns();

      HelperClass.renderTable(
          this,
          this.items,
          this.searchResult,
          this.lastPage,
          this.showEdit,
          this.showDelete,
          this.showSelect,
          this.showSeeMore
      )
    }


  },
  components: {
    Multiselect
  }
}
</script>

<style>

</style>