<template>
  <div>


    <md-card>
      <md-card-content>

        <!--    table-->
        <DataTable :items="rows" :editUrlName="edit_url_name" deleteUrl="roles" :columns="columns">
        </DataTable>

      </md-card-content>
    </md-card>

  </div>
</template>

<script>
import DataTable from "../../components/DataTable";

export default {
  name: "list",
  data() {
    return {
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
    }
  },
  components: {
    DataTable
  },

}
</script>