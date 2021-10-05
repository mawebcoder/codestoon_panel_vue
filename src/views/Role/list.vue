<template>
  <div>
    <md-card>
      <md-card-content>

        <DataTable :items="rows" :uri="uri" :editUrlName="edit_url_name" :deleteUri="delete_uri" :columns="columns">
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
      delete_uri: 'roles',
      rows: ['id', 'name', 'fa_name'],
      uri: 'roles',
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