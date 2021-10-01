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
      <!--      <md-dialog-actions>-->
      <!--        <md-button style="margin: 0 10px" @click="deleteItems" class="md-raised md-accent">بله</md-button>-->
      <!--        <md-button @click="$store.state.show_confirmation_dialog = false" class="md-raised md-primary">خیر</md-button>-->
      <!--      </md-dialog-actions>-->

    </md-dialog>


    <!--    table-->
    <md-card>


      <md-card-content>

        <DataTable editUrl="string" :editCallBack="getRoles" deleteUrl="roles" :deleteCallBack="getRoles"
                   :columns="columns" :rows="rows">
        </DataTable>
      </md-card-content>

    </md-card>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import HttpVerbs from "../../services/HttpVerbs";
import HelperClass from "../../services/HelperClass";
import DataTable from "../../components/DataTable";

export default {
  name: "list",
  created() {
    this.getRoles();
  },
  data() {
    return {
      showDialog: false,
      last_page: 0,
      params: null,

      type: '',
      columns: [
        {
          label: 'شناسه',
          field: 'id',
        },
        {
          label: 'عنوان فارسی',
          field: 'fa_title',
        },
        {
          label: 'عنوان انگلیسی',
          field: 'en_title',
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
      rows: [],

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
    deleteItems() {
      this.$store.state.loader = true;
      let id = this.params.row.id;
      HttpVerbs.deleteRequest('roles', {ids: [id]})
          .then(() => {
            this.getRoles();
            this.showDialog = false;
            HelperClass.showSuccess(this.$noty)
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    editItem() {
      alert('edit')
    },
    getRoles() {
      HttpVerbs.getRequest('roles')
          .then(res => {
            this.rows = [];
            if (res.status === 204) {
              return;
            }
            this.last_page = res.data.data.last_page;
            let data = res.data.data.data;
            data.forEach(item => {
              this.rows.push({
                id: item.id,
                fa_title: item.fa_name,
                en_title: item.name,
                delete: `<span class="delete-table-button">حذف</span>`,
                edit: '<span class="edit-table-button">ویرایش</span>',
                select: '<input class="checkbox-table" type="checkbox" value="' + item.id + '">'
              })
            })
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    }
  },
  components: {
    Multiselect,
    DataTable
  },

}
</script>

<style scoped>

</style>